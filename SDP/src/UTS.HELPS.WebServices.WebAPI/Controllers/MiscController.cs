using System;
using System.Collections.Generic;
using System.Web.Http;
using UTS.HELPS.WebServices.DataAccess;
using UTS.HELPS.WebServices.WebAPI.Constants;
using UTS.HELPS.WebServices.WebAPI.Responses;

namespace UTS.HELPS.WebServices.WebAPI.Controllers
{
    public class MiscController : BaseController
    {
        [HttpGet]
        [Route("api/misc/campus/{active?}")]
        public CampusListResponse ListCampuses(bool? active = null)
        {
            try
            {
                base.CheckApplicationKey();

                List<Campus> list = MiscDb.ListCampuses(active);
                return new CampusListResponse()
                {
                    IsSuccess = true,
                    Results = list
                };
            }
            catch (Exception e)
            {
                string msg = CreateExceptionMessage(e);
                return new CampusListResponse()
                {
                    IsSuccess = false,
                    DisplayMessage = string.Format(ErrorMessages.LIST_ERROR, msg)
                };
            }
        }

        [HttpGet]
        [Route("api/misc/lecturer/{active?}")]
        public LecturerListResponse ListLecturers(bool? active = null)
        {
            try
            {
                base.CheckApplicationKey();

                List<Lecturer> list = MiscDb.ListLecturers(active);
                return new LecturerListResponse()
                {
                    IsSuccess = true,
                    Results = list
                };
            }
            catch (Exception e)
            {
                string msg = CreateExceptionMessage(e);
                return new LecturerListResponse()
                {
                    IsSuccess = false,
                    DisplayMessage = string.Format(ErrorMessages.LIST_ERROR, msg)
                };
            }
        }

        [HttpGet]
        [Route("api/misc/appointment/{active?}")]
        public AppointmentListResponse ListAppointments(bool? active = null)
        {
            try
            {
                base.CheckApplicationKey();

                List<Appointment> list = MiscDb.ListAppointments(active);
                return new AppointmentListResponse()
                {
                    IsSuccess = true,
                    Results = list
                };
            }
            catch (Exception e)
            {
                string msg = CreateExceptionMessage(e);
                return new AppointmentListResponse()
                {
                    IsSuccess = false,
                    DisplayMessage = string.Format(ErrorMessages.LIST_ERROR, msg)
                };
            }
        }

        [HttpGet]
        [Route("api/misc/assignment/{active?}")]
        public AssignmentListResponse ListAssignments(bool? active = null)
        {
            try
            {
                base.CheckApplicationKey();

                List<Assignment> list = MiscDb.ListAssignments(active);
                return new AssignmentListResponse()
                {
                    IsSuccess = true,
                    Results = list
                };
            }
            catch (Exception e)
            {
                string msg = CreateExceptionMessage(e);
                return new AssignmentListResponse()
                {
                    IsSuccess = false,
                    DisplayMessage = string.Format(ErrorMessages.LIST_ERROR, msg)
                };
            }
        }
    }
}
