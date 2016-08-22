using System.Collections.Generic;
using UTS.HELPS.WebServices.DataAccess;

namespace UTS.HELPS.WebServices.WebAPI.Responses
{
    public class WorkshopListResponse : Response
    {
        public List<Workshop> Results { get; set; } 
    }
}
