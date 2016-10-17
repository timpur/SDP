using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using UTS.HELPS.WebServices.DataAccess;

namespace UTS.HELPS.WebServices.WebAPI.Responses
{
    public class NotifcationsResponse : Response
    {
        public List<Notification> Results { get; set; }
    }
}