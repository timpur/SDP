using System.Collections.Generic;
using UTS.HELPS.WebServices.DataAccess;

namespace UTS.HELPS.WebServices.WebAPI.Responses
{
    public class WorkshopBookingListResponse : Response
    {
        public List<WorkshopBooking> Results { get; set; } 
    }
}
