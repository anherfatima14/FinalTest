using DashboardAPI.Models;

namespace DashboardAPI.Repositories
{
    public interface IAdminRepository
    {
        Task<IEnumerable<Employer>> GetAllEmployersAsync();
    }
}
