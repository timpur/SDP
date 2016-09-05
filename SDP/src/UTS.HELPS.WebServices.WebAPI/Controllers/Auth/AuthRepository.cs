using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Threading.Tasks;

namespace UTS.HELPS.WebServices.WebAPI.Controllers.Auth
{
    public class AuthRepository : IDisposable
    {
        private AuthDBContext authContext;

        private UserManager<IdentityUser> userManager;

        public AuthRepository()
        {
            authContext = new AuthDBContext();
            userManager = new UserManager<IdentityUser>(new UserStore<IdentityUser>(authContext));
        }

        public async Task<IdentityResult> RegisterUser(UserModel userModel)
        {
            IdentityUser user = new IdentityUser
            {
                UserName = userModel.UserName
            };
            var result = await userManager.CreateAsync(user, userModel.Password);
            return result;
        }

        public async Task<IdentityUser> FindUser(string userName, string password)
        {
            IdentityUser user = await userManager.FindAsync(userName, password);
            return user;
        }

        public void Dispose()
        {
            authContext.Dispose();
            userManager.Dispose();
        }
    }
}