using System.Collections.Generic;
using UTS.HELPS.WebServices.DataAccess;

namespace UTS.HELPS.WebServices.WebAPI.Responses
{
    public class AssignmentListResponse : Response
    {
        public List<Assignment> Results { get; set; }
    }
}
