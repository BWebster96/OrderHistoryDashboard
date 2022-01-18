using Sabio.Models;
using Sabio.Models.Domain;


namespace Sabio.Services
{
    public interface IUserOrderService
    {
        Paged<UserOrders> GetByUserId(int currentId, int pageIndex, int pageSize);
    }
}
