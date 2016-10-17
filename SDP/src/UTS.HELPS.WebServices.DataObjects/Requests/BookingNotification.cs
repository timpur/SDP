using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UTS.HELPS.WebServices.DataObjects.Requests
{
    public class BookingNotification
    {
        public int bookingID { get; set; }
        public List<NotificationRequest> Notifications { get; set; }
        
    }
    public class NotificationRequest
    {
        public UTS.HELPS.WebServices.DataObjects.Enums.NotifcationTime time { get; set; }
    }
}
