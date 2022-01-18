using System;
using System.Collections.Generic;
using System.Text;

namespace Sabio.Models.Domain
{
    public class UserOrders
    {
        public int UserId { get; set; }
        public string Name { get; set; }
        public int OrderId { get; set; }
        public decimal Total { get; set; }
        public string TrackingUrl { get; set; }
        public string TrackingCode { get; set; }
        public string Status { get; set; }
        public DateTime Created { get; set; }
        public DateTime Modified { get; set; }
    }
}
