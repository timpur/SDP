using System.Collections.Generic;
using UTS.HELPS.WebServices.DataAccess;

namespace UTS.HELPS.WebServices.WebAPI.Responses
{
    public class AppointmentListResponse : Response
    {
        public List<Appointment> Results { get; set; }
    }
}
