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
            try
            {
                base.CheckApplicationKey();
                return new StudentResponse()
                {
                    IsSuccess = true,
                    Result = StudentDb.GetStudent(studentId)
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
        [HttpGet]
        [Route("api/student/active/{studentID}")]
        public StudnetAccountActive isStudentAccountActive(string studentID)
        {
            try
            {
                base.CheckApplicationKey();
                bool? active = StudentDb.isStudentAccountActive(studentID);
                if (active.HasValue)
                {
                    return new StudnetAccountActive()
                    {
                        isStudentAccountActive = active.Value,
                        IsSuccess = true
                    };
                }
                else
                {
                    throw new Exception("Account Does Not Exist");
                }
            }
            catch (Exception e)
            {
                return new StudnetAccountActive()
                {
                    IsSuccess = false,
                    DisplayMessage = String.Format(ErrorMessages.STUDENT_ACCOUNT_ACTIVE_ERROR, e.Message)
                };
            }
        }
    }
}
