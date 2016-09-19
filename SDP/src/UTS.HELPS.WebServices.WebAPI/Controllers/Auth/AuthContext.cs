using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity.EntityFramework;
using System.Data.Entity;
using Microsoft.AspNet.Identity;

namespace UTS.HELPS.WebServices.WebAPI.Controllers.Auth
{
    public class AuthDBContext : IdentityDbContext<HELPSIdentityUser>
    {
        public AuthDBContext()
            : base("AuthDB")
        {
            //Database.SetInitializer(new IdentityDbInitializer());
        }
    }

    public class IdentityDbInitializer : DropCreateDatabaseAlways<AuthDBContext>
    {
        protected override void Seed(AuthDBContext context)
        {
            InitializeIdentityForEF(context);
            base.Seed(context);
        }

        //Create User=Admin@Admin.com with password=Admin@123456 in the Admin role        
        public static void InitializeIdentityForEF(AuthDBContext db)
        {
            UserManager<HELPSIdentityUser> userManager = new UserManager<HELPSIdentityUser>(new UserStore<HELPSIdentityUser>(db));
            RoleManager<IdentityRole> roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(db));

            // Create Rols
            string[] roles = { "Admin", "User" };
            foreach (string role in roles)
            {
                if (!roleManager.RoleExists(role))
                {
                    roleManager.Create(new IdentityRole(role));
                }
            }

            HELPSIdentityUser admin = new HELPSIdentityUser()
            {
                UserName = "Admin",
                FirstName = "Admin",
                LastName = "Admin"
            };

            if (userManager.FindByName(admin.UserName) == null)
            {
                IdentityResult result = userManager.Create(admin, "adminadmin");
                if (!result.Succeeded)
                    throw new Exception(String.Format("Admin not Created: {0}", result.Errors.ToString()));
            }

            if (!userManager.GetRoles(admin.Id).Contains(roles[0]))
            {
                IdentityResult result = userManager.AddToRole(admin.Id, roles[0]);
                if (!result.Succeeded)
                    throw new Exception(String.Format("Admin not added to Admin Role: {0}", result.Errors.ToString()));
            }

        }
    }


    public class HELPSIdentityUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}