using Microsoft.AspNetCore.Mvc;
using DashboardAPI.Repositories;
using DashboardAPI.Models;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace DashboardAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _adminRepository;

        public AdminController(IAdminRepository adminRepository)
        {
            _adminRepository = adminRepository;
        }

        [HttpGet("employers")]
        public async Task<IActionResult> GetEmployers()
        {
            var employers = await _adminRepository.GetAllEmployersAsync();
            return Ok(employers);
        }
    }
}
