using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace UTS.HELPS.WebServices.WebAPI.Responses
{
    public class AuthResponse : Response
    {
        public List<string> errors { get; set; }

        public AuthResponse()
        {
            errors = new List<string>();
        }
    }
}