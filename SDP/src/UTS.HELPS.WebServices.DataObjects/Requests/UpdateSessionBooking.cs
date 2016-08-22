namespace UTS.HELPS.WebServices.DataObjects.Requests
{
    public class UpdateSessionBooking
    {
        public int SessionId { get; set; }
        public string StudentId { get; set; }
        public bool? Cancel { get; set; }
        public string Assistance { get; set; }
        public string Reason { get; set; }
        public int? Attended { get; set; }
        public int? WaitingId { get; set; }
        public int? IsGroup { get; set; }
        public string NumPeople { get; set; }
        public string LecturerComment { get; set; }
        public string LearningIssues { get; set; }
        public int? IsLocked { get; set; }
        public string AssignType { get; set; }
        public string AssignTypeOther { get; set; }
        public string Subject { get; set; }
        public string Appointments { get; set; }
        public string AppointmentsOther { get; set; }
        public string AssistanceText { get; set; }
        public int UserId { get; set; }
    }
}
