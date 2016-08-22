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
    
    public partial class SessionBooking
    {
        public string LecturerFirstName { get; set; }
        public string LecturerLastName { get; set; }
        public string LecturerEmail { get; set; }
        public string SessionTypeAbb { get; set; }
        public string SessionType { get; set; }
        public string AssignmentType { get; set; }
        public string AppointmentType { get; set; }
        public int BookingId { get; set; }
        public System.DateTime StartDate { get; set; }
        public System.DateTime EndDate { get; set; }
        public string Campus { get; set; }
        public bool Cancel { get; set; }
        public string Assistance { get; set; }
        public string Reason { get; set; }
        public Nullable<int> Attended { get; set; }
        public Nullable<int> WaitingID { get; set; }
        public Nullable<int> IsGroup { get; set; }
        public string NumPeople { get; set; }
        public string LecturerComment { get; set; }
        public string LearningIssues { get; set; }
        public Nullable<int> IsLocked { get; set; }
        public string AssignTypeOther { get; set; }
        public string Subject { get; set; }
        public string AppointmentsOther { get; set; }
        public string AssistanceText { get; set; }
        public int SessionId { get; set; }
        public Nullable<System.DateTime> archived { get; set; }
    }
}
