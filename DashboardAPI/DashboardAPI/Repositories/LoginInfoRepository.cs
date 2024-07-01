using Dapper;
using DashboardAPI.Models;
using DashboardAPI.DbContext;

namespace DashboardAPI.Repositories
{
    public class LoginInfoRepository : ILoginInfoRepository
    {
        private readonly DatabaseContext _context;

        public LoginInfoRepository(DatabaseContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task AddLoginInfoAsync(LoginInfo loginInfo)
        {
            using (var connection = _context.CreateConnection())
            {
                string sql = "INSERT INTO LoginInfos (EmployeeID, LoginDate, LogoutDate, EmployeeName, EmployeeDescription) VALUES (@EmployeeID, @LoginDate, @LogoutDate, @EmployeeName, @EmployeeDescription)";
                await connection.ExecuteAsync(sql, loginInfo);
            }
        }

        public async Task<IEnumerable<LoginInfo>> GetLoginInfosAsync()
        {
            using (var connection = _context.CreateConnection())
            {
                string sql = "SELECT * FROM LoginInfos";
                return await connection.QueryAsync<LoginInfo>(sql);
            }
        }
    }

}
