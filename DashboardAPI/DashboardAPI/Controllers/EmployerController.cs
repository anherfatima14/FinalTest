using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using DashboardAPI.Repositories;

namespace DashboardAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployerController : ControllerBase
    {
        private readonly IEmployerRepository _employerRepository;

        public EmployerController(IEmployerRepository employerRepository)
        {
            _employerRepository = employerRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetEmployers()
        {
            var employers = await _employerRepository.GetEmployersAsync();
            return Ok(employers);
        }
    }
}
