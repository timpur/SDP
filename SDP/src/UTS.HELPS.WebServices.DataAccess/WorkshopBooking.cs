//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace UTS.HELPS.WebServices.DataAccess
{
    using System;
    
    public partial class WorkshopBooking
    {
        public int BookingId { get; set; }
        public Nullable<int> workshopID { get; set; }
        public string studentID { get; set; }
        public string topic { get; set; }
        public string description { get; set; }
        public string targetingGroup { get; set; }
        public Nullable<int> campusID { get; set; }
        public Nullable<System.DateTime> starting { get; set; }
        public Nullable<System.DateTime> ending { get; set; }
        public Nullable<int> maximum { get; set; }
        public Nullable<int> cutoff { get; set; }
        public Nullable<int> canceled { get; set; }
        public Nullable<int> attended { get; set; }
        public Nullable<int> WorkShopSetID { get; set; }
        public string type { get; set; }
        public Nullable<int> reminder_num { get; set; }
        public Nullable<int> reminder_sent { get; set; }
        public Nullable<System.DateTime> WorkshopArchived { get; set; }
        public Nullable<System.DateTime> BookingArchived { get; set; }
        public string campus { get; set; }
    }
}
