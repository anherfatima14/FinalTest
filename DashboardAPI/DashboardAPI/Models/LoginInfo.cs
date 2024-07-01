namespace DashboardAPI.Models
{
    public class LoginInfo
    {
        public int LogID { get; set; }
        public int EmployeeID { get; set; }
        public DateTime LoginDate { get; set; }
        public DateTime? LogoutDate { get; set; }
        public string EmployeeName { get; set; }
        public string EmployeeDescription { get; set; }
    }

}
