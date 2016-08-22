using System.Collections.Generic;
using System.Linq;

namespace UTS.HELPS.WebServices.DataAccess
{
    public class MiscDb
    {
        public static List<Campus> ListCampuses(bool? active)
        {
            using (HELPSEntities ctx = new HELPSEntities())
            {
                return ctx.prcListCampuses(active).ToList();
            }
        }

        public static List<Lecturer> ListLecturers(bool? active)
        {
            using (HELPSEntities ctx = new HELPSEntities())
            {
                return ctx.prcListLecturers(active).ToList();
            }            
        }

        public static List<Assignment> ListAssignments(bool? active)
        {
            using (HELPSEntities ctx = new HELPSEntities())
            {
                return ctx.prcListAssignments(active).ToList();
            }
        }

        public static List<Appointment> ListAppointments(bool? active)
        {
            using (HELPSEntities ctx = new HELPSEntities())
            {
                return ctx.prcListAppointments(active).ToList();
            }
        }
    }
}
