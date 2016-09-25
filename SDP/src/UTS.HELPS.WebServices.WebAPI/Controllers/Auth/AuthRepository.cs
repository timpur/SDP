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
        private UserManager<HELPSIdentityUser> userManager;
        private RoleManager<IdentityRole> roleManager;

        public AuthRepository()
        {
            authContext = new AuthDBContext();
            userManager = new UserManager<HELPSIdentityUser>(new UserStore<HELPSIdentityUser>(authContext));
            roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(authContext));

        }

        public async Task<IdentityResult> RegisterUser(UserModel userModel)
        {
            HELPSIdentityUser user = new HELPSIdentityUser
            {
                UserName = userModel.UserName,
                FirstName = userModel.FirstName,
                LastName = userModel.LastName
            };
            IdentityResult result = await userManager.CreateAsync(user, userModel.Password);
            if (result.Succeeded)
            {
                userManager.AddToRole(user.Id, "User");
            }
            return result;
        }

        public async Task<HELPSIdentityUser> FindUser(string userName, string password)
        {
            HELPSIdentityUser user = await userManager.FindAsync(userName, password);
            return user;
        }

        public async Task<string> GetRoleName(string id)
        {
            return (await roleManager.FindByIdAsync(id)).Name;
        }

        public void Dispose()
        {
            authContext.Dispose();
            userManager.Dispose();
        }
    }
}