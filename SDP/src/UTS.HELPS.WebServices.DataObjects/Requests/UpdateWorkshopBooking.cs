namespace UTS.HELPS.WebServices.DataObjects.Requests
{
    public class UpdateWorkshopBooking
    {
        public int WorkshopId { get; set; }
        public string StudentId { get; set; }
        public int? Canceled { get; set; }
        public int? Attended { get; set; }
        public int UserId { get; set; }
    }
}
