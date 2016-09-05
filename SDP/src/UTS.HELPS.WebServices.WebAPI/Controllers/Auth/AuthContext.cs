using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity.EntityFramework;

namespace UTS.HELPS.WebServices.WebAPI.Controllers.Auth
{
    public class AuthDBContext : IdentityDbContext<IdentityUser>
    {
        public AuthDBContext()
            : base("AuthDB")
        {

        }
    }
}