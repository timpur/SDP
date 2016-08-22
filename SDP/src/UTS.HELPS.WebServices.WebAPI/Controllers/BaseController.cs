using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Http;
using UTS.HELPS.WebServices.WebAPI.Constants;

namespace UTS.HELPS.WebServices.WebAPI.Controllers
{
    public class BaseController : ApiController
    {
        protected string CreateExceptionMessage(Exception e)
        {
            string msg = e.Message;
            if (e.InnerException != null)
            {
                msg += " " + e.InnerException.Message;
            }
            return msg;
        }

        protected void CheckApplicationKey()
        {
            string appKey = ConfigurationManager.AppSettings["ApplicationKey"];

            IEnumerable<string> headerValues;
            bool res = Request.Headers.TryGetValues("AppKey", out headerValues);

            if (!res)
            {
                throw new Exception(ErrorMessages.APP_KEY_NOT_FOUND);
            }

            var reqAppKey = headerValues.FirstOrDefault();
            if (!appKey.Equals(reqAppKey))
            {
                throw new Exception(ErrorMessages.APP_KEY_INVALID);
            }
        }
    }
}
