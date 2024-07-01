namespace DashboardAPI.Repositories
{
    public interface IEmployeeRepository
    {
        Task<Employee> GetEmployeeByIdAsync(int id);
        Task<Employee> GetEmployeeByNameAsync(string name); // Add this method
        Task AddEmployeeAsync(Employee employee);
        Task<IEnumerable<Employee>> GetAllEmployeesAsync();
    }

}
