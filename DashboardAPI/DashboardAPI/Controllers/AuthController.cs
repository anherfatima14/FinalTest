using Microsoft.AspNetCore.Mvc;
using DashboardAPI.Repositories;
using DashboardAPI.Models;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.IO;

namespace DashboardAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IEmployerRepository _employerRepository;
        private readonly IAdminRepository _adminRepository;
        private readonly ILoginInfoRepository _loginInfoRepository;
        private readonly ILogger<AuthController> _logger;

        public AuthController(
            IEmployeeRepository employeeRepository,
            IEmployerRepository employerRepository,
            IAdminRepository adminRepository,
            ILoginInfoRepository loginInfoRepository,
            ILogger<AuthController> logger)
        {
            _employeeRepository = employeeRepository;
            _employerRepository = employerRepository;
            _adminRepository = adminRepository;
            _loginInfoRepository = loginInfoRepository;
            _logger = logger;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                if (string.IsNullOrEmpty(loginDto.Username) || string.IsNullOrEmpty(loginDto.Password))
                {
                    return BadRequest("Username and password are required.");
                }

                // Example static users for demonstration purposes
                var users = new List<(string Username, string Password, string Role)>
                {
                    ("admin", HashPassword("adminpassword"), "Admin"),
                    ("John Doe", HashPassword("password123"), "Employee"),
                    ("Jane Smith", HashPassword("password123"), "Employee"),
                    ("Acme Corporation", HashPassword("password123"), "Employer"),
                    ("Globex Corporation", HashPassword("password123"), "Employer")
                };

                var user = users.FirstOrDefault(u => u.Username == loginDto.Username);

                if (user == default || !VerifyPassword(loginDto.Password, user.Password))
                {
                    return Unauthorized(new { message = "Invalid login credentials" });
                }

                LogToFile(loginDto.Username, DateTime.Now); // Logging login info
                await SaveLoginInfoToDatabase(loginDto.Username, DateTime.Now); // Save login info to database

                return Ok(new { role = user.Role, message = $"{user.Role} login successful" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during login");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("login-infos")]
        public async Task<IActionResult> GetLoginInfos()
        {
            try
            {
                var loginInfos = await _loginInfoRepository.GetLoginInfosAsync();
                return Ok(loginInfos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving login infos");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("employee-login-infos")]
        public async Task<IActionResult> GetEmployeeLoginInfos()
        {
            try
            {
                var loginInfos = await _loginInfoRepository.GetLoginInfosAsync();
                return Ok(loginInfos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving login infos");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(Employee employee)
        {
            try
            {
                employee.Password = HashPassword(employee.Password); // Hashing the password before storing
                await _employeeRepository.AddEmployeeAsync(employee);
                return Ok(new { message = "Employee registered successfully" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during registration");
                return BadRequest(new { message = "Error registering employee", error = ex.Message });
            }
        }

        private async Task SaveLoginInfoToDatabase(string username, DateTime loginTime)
        {
            try
            {
                var employee = await _employeeRepository.GetEmployeeByNameAsync(username);

                if (employee != null)
                {
                    var loginInfo = new LoginInfo
                    {
                        EmployeeID = employee.EmployeeID,
                        LoginDate = loginTime,
                        LogoutDate = null, // This can be updated later when the employee logs out
                        EmployeeName = employee.EmployeeName,
                        EmployeeDescription = employee.EmployeeDescription
                    };

                    await _loginInfoRepository.AddLoginInfoAsync(loginInfo);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error saving login info to database");
                throw;
            }
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        private bool VerifyPassword(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }

        private void LogToFile(string username, DateTime loginTime)
        {
            var logMessage = $"{DateTime.Now}: User {username} logged in at {loginTime}\n";
            var logFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "logs", "log.txt");

            if (!Directory.Exists(Path.GetDirectoryName(logFilePath)))
            {
                Directory.CreateDirectory(Path.GetDirectoryName(logFilePath));
            }

            System.IO.File.AppendAllText(logFilePath, logMessage);
        }
    }
}
