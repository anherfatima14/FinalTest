using DashboardAPI.Models;


namespace DashboardAPI.Repositories
{
    public interface IEmployerRepository
    {
        Task<IEnumerable<Employer>> GetEmployersAsync();
        Task<Employer> GetEmployerByIdAsync(int id);
    }
}
