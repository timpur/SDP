using System;

namespace UTS.HELPS.WebServices.DataObjects.Requests
{
    public class WorkshopBookingSearch
    {
        public string StudentId { get; set; }
        public DateTime? StartingDtBegin { get; set; }
        public DateTime? StartingDtEnd { get; set; }
        public DateTime? EndingDtBegin { get; set; }
        public DateTime? EndingDtEnd { get; set; }
        public int? CampusId { get; set; }
        public bool? Active { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }

        public WorkshopBookingSearch()
        {
            Page = 1;
            PageSize = 10;
        }
    }
}
