using DashboardAPI.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DashboardAPI.Repositories
{
    public interface ILoginInfoRepository
    {
        Task<IEnumerable<LoginInfo>> GetLoginInfosAsync();
        Task AddLoginInfoAsync(LoginInfo loginInfo);
    }
}