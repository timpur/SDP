using System.Collections.Generic;
using System.Linq;
using UTS.HELPS.WebServices.DataObjects.Requests;

namespace UTS.HELPS.WebServices.DataAccess
{
    public class SessionDb
    {
        public static BasicSession GetSession(int sessionId)
        {
            using (HELPSEntities ctx = new HELPSEntities())
            {
                return ctx.prcGetSession(sessionId).FirstOrDefault();
            }            
        }

        public static BasicSessionBooking GetSessionBooking(int sessionId, string studentId)
        {
            using (HELPSEntities ctx = new HELPSEntities())
            {
                return ctx.prcGetSessionBooking(sessionId, studentId).FirstOrDefault();
            }          
        }

        public static List<SessionType> ListSessionTypes(bool? active)
        {
            using (HELPSEntities ctx = new HELPSEntities())
            {
                return ctx.prcListSessionTypes(active).ToList();
            }
        }

        public static List<SessionBooking> SearchSessionBookings(SessionBookingSearch bookingSearch)
        {
            using (HELPSEntities ctx = new HELPSEntities())
            {
                return ctx.prcSearchSessionBookings(bookingSearch.StudentId, bookingSearch.StartingDtBegin, bookingSearch.StartingDtEnd, 
                    bookingSearch.EndingDtBegin, bookingSearch.EndingDtEnd, bookingSearch.Campus,
                    bookingSearch.LecturerId, bookingSearch.SessionTypeId, bookingSearch.Active, 
                    bookingSearch.Page, bookingSearch.PageSize).ToList();
            }
        }

        public static void UpdateSessionBooking(UpdateSessionBooking update)
        {
            using (HELPSEntities ctx = new HELPSEntities())
            {
                ctx.prcUpdateSessionBooking(update.SessionId, update.StudentId, update.Cancel, update.Assistance,
                    update.Reason, update.Attended, update.WaitingId, update.IsGroup, update.NumPeople,
                    update.LecturerComment, update.LearningIssues, update.IsLocked, update.AssignType,
                    update.AssignTypeOther, update.Subject, update.Appointments, update.AppointmentsOther,
                    update.AssistanceText, update.UserId);
            }
        }
    }
}
