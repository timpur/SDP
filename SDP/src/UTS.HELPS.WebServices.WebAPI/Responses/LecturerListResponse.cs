using System.Collections.Generic;
using UTS.HELPS.WebServices.DataAccess;

namespace UTS.HELPS.WebServices.WebAPI.Responses
{
    public class LecturerListResponse : Response
    {
        public List<Lecturer> Results { get; set; }
    }
}
