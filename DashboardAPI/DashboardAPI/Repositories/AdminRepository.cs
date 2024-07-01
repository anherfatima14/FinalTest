using Dapper;
using DashboardAPI.Models;
using Microsoft.Data.SqlClient;


namespace DashboardAPI.Repositories
{
    public class AdminRepository : IAdminRepository
    {
        private readonly IConfiguration _configuration;

        public AdminRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task<IEnumerable<Employer>> GetAllEmployersAsync()
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("DefaultConnection")))
            {
                var sql = "SELECT EmployerID, EmployerName FROM Employers";
                var employers = await connection.QueryAsync<Employer>(sql);
                return employers;
            }
        }
    }
}
