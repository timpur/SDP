using System;
using System.Web.Http;
using UTS.HELPS.WebServices.DataAccess;
using UTS.HELPS.WebServices.DataObjects.Requests;
using UTS.HELPS.WebServices.WebAPI.Constants;
using UTS.HELPS.WebServices.WebAPI.Responses;

namespace UTS.HELPS.WebServices.WebAPI.Controllers
{
    public class StudentController : BaseController
    {
        [HttpGet]
        [Route("api/student/{studentId}")]
        public StudentResponse GetStudent(string studentId)
        {
            StudentResponse studentResponse = new StudentResponse();
            try
            {
                base.CheckApplicationKey();
                studentResponse.Result = StudentDb.GetStudent(studentId);
            }
            catch (Exception e)
            {
                string arg = base.CreateExceptionMessage(e);
                studentResponse.IsSuccess = false;
                studentResponse.DisplayMessage = string.Format(ErrorMessages.STUDENT_GET_ERROR, arg);
            }
            studentResponse.IsSuccess = true;
            return studentResponse;
        }

        [HttpPost]
        [Route("api/student/register")]
        public Response RegisterStudent(StudentReg studentReg)
        {
            try
            {
                base.CheckApplicationKey();

                StudentDb.RegisterStudent(studentReg);
            }
            catch (Exception e)
            {
                string msg = CreateExceptionMessage(e);
                return new Response()
                {
                    IsSuccess = false,
                    DisplayMessage = string.Format(ErrorMessages.STUDENT_REGISTER_ERROR, msg)
                };
            }

            return new Response()
            {
                IsSuccess = true
            };
        }
    }
}
