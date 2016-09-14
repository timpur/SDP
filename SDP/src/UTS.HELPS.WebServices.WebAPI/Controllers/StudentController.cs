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
        //[Authorize]
        [HttpGet]
        [Route("api/student/{studentId}")]
        public StudentResponse GetStudent(string studentId)
        {
            StudentResponse studentResponse = new StudentResponse();
            try
            {
                base.CheckApplicationKey();
                studentResponse.Result = StudentDb.GetStudent(studentId);
                return new StudentResponse()
                {
                    IsSuccess = true
                };
            }
            catch (Exception e)
            {
                string arg = base.CreateExceptionMessage(e);
                return new StudentResponse()
                {
                    IsSuccess = false,
                    DisplayMessage = string.Format(ErrorMessages.STUDENT_GET_ERROR, arg)
                };
            }
        }

        [HttpPost]
        [Route("api/student/register")]
        public Response RegisterStudent(StudentReg studentReg)
        {
            try
            {
                base.CheckApplicationKey();
                StudentDb.RegisterStudent(studentReg);
                return new Response()
                {
                    IsSuccess = true
                };
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
        }

        [HttpPost]
        [Route("api/student/update")]
        public Response UpdateStudent(StudentUpdate student)
        {
            try
            {
                base.CheckApplicationKey();
                StudentDb.UpdateStudentInformation(student);
                return new Response()
                {
                    IsSuccess = true
                };
            }
            catch (Exception e)
            {
                string msg = CreateExceptionMessage(e);
                return new Response()
                {
                    IsSuccess = false,
                    DisplayMessage = string.Format(ErrorMessages.STUDENT_UPDATE_ERROR, msg)
                };
            }
        }
    }
}
