namespace UTS.HELPS.WebServices.WebAPI.Constants
{
    public class ErrorMessages
    {
        public static readonly string APP_KEY_NOT_FOUND = "Application key not found in request headers.";
        public static readonly string APP_KEY_INVALID = "Invalid application key.";

        public static readonly string SEARCH_CRITERIA_REQ_ERROR = "Error executing search. No search critera found.";    
        public static readonly string LIST_ERROR = "Error retrieving list: {0}";
        public static readonly string UPDATE_REQ_ERROR = "Error updating: No update details found.";

        public static readonly string WORKSHOP_BOOKING_NOT_FOUND = "Workshop booking not found.";
        public static readonly string WORKSHOP_NOT_FOUND = "Workshop not found.";
        public static readonly string STUDENT_NOT_FOUND = "Student not found.";

        public static readonly string BOOKING_SEARCH_ERROR = "Error searching bookings: {0}";
        public static readonly string SEARCH_WORKSHOP_BOOKING_ERROR = "Error searching for workshop bookings: {0}";
        public static readonly string SEARCH_WORKSHOP_ERROR = "Error searching for workshop: {0}";

        public static readonly string STUDENT_REGISTER_ERROR = "Error registering student: {0}";
        public static readonly string CREATE_WORKSHOP_BOOKING_ERROR = "Error creating workshop booking: {0}";
        public static readonly string CREATE_WORKSHOP_BOOKING_EXISTS_ERROR = "Error creating workshop booking: Booking already exists.";
        public static readonly string MAXIMUM_WORKSHOP_BOOKINGS_ERROR = "Error creating workshop booking: Workshop has reached cut-off for bookings.";
        public static readonly string CREATE_WORKSHOP_WAITING_ERROR = "Error creating workshop wait-list entry: {0}";
        public static readonly string CREATE_WORKSHOP_WAITING_BOOKING_EXISTS_ERROR = "Error creating workshop wait-list entry: Student has booking for this workshop.";
        public static readonly string CREATE_WORKSHOP_WAITING_EXISTS_ERROR = "Error creating workshop wait-list entry: Student is already on the wait-list.";
        
        public static readonly string CANCEL_WORKSHOP_BOOKING_ERROR = "Error canceling workshop booking: {0}";
        public static readonly string UPDATE_SESSION_BOOKING_ERROR = "Error updating session booking: {0}";
        public static readonly string UPDATE_WORKSHOP_BOOKING_ERROR = "Error updating workshop booking: {0}";
    }
}
