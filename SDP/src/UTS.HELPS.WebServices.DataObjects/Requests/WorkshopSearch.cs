using System;

namespace UTS.HELPS.WebServices.DataObjects.Requests
{
    public class WorkshopSearch
    {
        public int? WorkshopSetId { get; set; }
        public string Topic { get; set; }
        public DateTime? StartingDtBegin { get; set; }
        public DateTime? StartingDtEnd { get; set; }
        public DateTime? EndingDtBegin { get; set; }
        public DateTime? EndingDtEnd { get; set; }
        public int? CampusId { get; set; }
        public bool? Active { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }

        public WorkshopSearch()
        {
            Page = 1;
            PageSize = 10;
        }
    }
}
