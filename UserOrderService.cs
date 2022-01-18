using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;

namespace Sabio.Services
{
    public class UserOrderService : IUserOrderService
    {
        IDataProvider _data = null;

        public UserOrderService(IDataProvider data)
        {
            _data = data;
        }
        public Paged<UserOrders> GetByUserId(int currentId, int pageIndex, int pageSize)
        {
            Paged<UserOrders> pagedList = null;
            List<UserOrders> list = null;
            string procName = "[dbo].[UserOrders_SelectByUserId_Paginated]";
            int totalCount = 0;

            _data.ExecuteCmd(procName
                , inputParamMapper: delegate (SqlParameterCollection param)
                {
                    param.AddWithValue("@UserId", currentId);
                    param.AddWithValue("@PageIndex", pageIndex);
                    param.AddWithValue("@PageSize", pageSize);
                }
                , singleRecordMapper: delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    UserOrders aUserOrder = MapOrder(reader, ref startingIndex);

                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }

                    if (list == null)
                    {
                        list = new List<UserOrders>();
                    }

                    list.Add(aUserOrder);
                });

            if (list != null)
            {
                pagedList = new Paged<UserOrders>(list, pageIndex, pageSize, totalCount);
            }

            return pagedList;

        }
        private static UserOrders MapOrder(IDataReader reader, ref int startingIndex)
        {
            UserOrders aUserOrder = new UserOrders();

            aUserOrder.UserId = reader.GetSafeInt32(startingIndex++);
            aUserOrder.Name = reader.GetSafeString(startingIndex++);
            aUserOrder.OrderId = reader.GetSafeInt32(startingIndex++);
            aUserOrder.Total = reader.GetSafeDecimal(startingIndex++);
            aUserOrder.TrackingUrl = reader.GetSafeString(startingIndex++);
            aUserOrder.TrackingCode = reader.GetSafeString(startingIndex++);
            aUserOrder.Status = reader.GetSafeString(startingIndex++);
            aUserOrder.Created = reader.GetSafeDateTime(startingIndex++);
            aUserOrder.Modified = reader.GetSafeDateTime(startingIndex++);

            return aUserOrder;
        }
    }
}
