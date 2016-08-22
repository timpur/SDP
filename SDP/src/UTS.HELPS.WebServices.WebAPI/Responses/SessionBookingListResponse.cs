using System.Collections.Generic;
using UTS.HELPS.WebServices.DataAccess;

namespace UTS.HELPS.WebServices.WebAPI.Responses
{
    public class SessionBookingListResponse : Response
    {
        public List<SessionBooking> Results { get; set; }
    }
}
