using Dapper;
using DashboardAPI.DbContext;

namespace DashboardAPI.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly DatabaseContext _context;

        public EmployeeRepository(DatabaseContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            using (var connection = _context.CreateConnection())
            {
                string sql = "SELECT * FROM Employees WHERE EmployeeID = @Id";
                return await connection.QueryFirstOrDefaultAsync<Employee>(sql, new { Id = id });
            }
        }

        public async Task<Employee> GetEmployeeByNameAsync(string username)
        {
            using (var connection = _context.CreateConnection())
            {
                string sql = "SELECT * FROM Employees WHERE EmployeeName = @Username";
                return await connection.QueryFirstOrDefaultAsync<Employee>(sql, new { Username = username });
            }
        }

        public async Task AddEmployeeAsync(Employee employee)
        {
            using (var connection = _context.CreateConnection())
            {
                string sql = "INSERT INTO Employees (EmployeeName, EmployeeDescription, EmployeeAge, EmployeeGender, ImageURL) VALUES (@EmployeeName, @EmployeeDescription, @EmployeeAge, @EmployeeGender, @ImageURL)";
                await connection.ExecuteAsync(sql, employee);
            }
        }

        public async Task<IEnumerable<Employee>> GetAllEmployeesAsync()
        {
            using (var connection = _context.CreateConnection())
            {
                string sql = "SELECT * FROM Employees";
                return await connection.QueryAsync<Employee>(sql);
            }
        }
    }
}
