using Dapper;
using DashboardAPI.Models;
using DashboardAPI.DbContext;

namespace DashboardAPI.Repositories
{
    public class EmployerRepository : IEmployerRepository
    {
        private readonly DatabaseContext _context;

        public EmployerRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Employer>> GetEmployersAsync()
        {
            using (var connection = _context.CreateConnection())
            {
                string sql = "SELECT * FROM Employers";
                return await connection.QueryAsync<Employer>(sql);
            }
        }

        public async Task<Employer> GetEmployerByIdAsync(int id)
        {
            using (var connection = _context.CreateConnection())
            {
                string sql = "SELECT * FROM Employers WHERE EmployerID = @Id";
                return await connection.QueryFirstOrDefaultAsync<Employer>(sql, new { Id = id });
            }
        }
    }
}
