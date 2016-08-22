using System.Collections.Generic;
using UTS.HELPS.WebServices.DataAccess;

namespace UTS.HELPS.WebServices.WebAPI.Responses
{
    public class WorkShopSetListResponse : Response
    {
        public List<WorkShopSet> Results { get; set; }
    }
}
