using System.Collections.Generic;
using UTS.HELPS.WebServices.DataAccess;

namespace UTS.HELPS.WebServices.WebAPI.Responses
{
    public class SessionTypeListResponse : Response
    {
        public List<SessionType> Results { get; set; }
    }
}
