using System.Collections.Generic;
using UTS.HELPS.WebServices.DataAccess;

namespace UTS.HELPS.WebServices.WebAPI.Responses
{
    public class CampusListResponse : Response
    {
        public List<Campus> Results { get; set; } 
    }
}
