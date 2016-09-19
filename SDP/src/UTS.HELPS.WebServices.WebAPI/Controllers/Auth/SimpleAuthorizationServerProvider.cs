using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security.OAuth;
using System.Security.Claims;
using Microsoft.Owin.Security;

namespace UTS.HELPS.WebServices.WebAPI.Controllers.Auth
{
    public class SimpleAuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            using (AuthRepository auth = new AuthRepository())
            {
                HELPSIdentityUser user = await auth.FindUser(context.UserName, context.Password);

                if (user == null)
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                    return;
                }

                ClaimsIdentity identity = new ClaimsIdentity(context.Options.AuthenticationType);
                identity.AddClaim(new Claim(ClaimTypes.Name, user.UserName));
                foreach (IdentityUserRole role in user.Roles)
                {
                    string roleName = await auth.GetRoleName(role.RoleId);
                    identity.AddClaim(new Claim(ClaimTypes.Role, roleName));
                }

                AuthenticationProperties properties = CreateProperties(user);
                AuthenticationTicket ticket = new AuthenticationTicket(identity, properties);

                context.Validated(ticket);
            }
        }

        public static AuthenticationProperties CreateProperties(HELPSIdentityUser user)
        {
            IDictionary<string, string> data = new Dictionary<string, string>
            {
                {"UserName", user.UserName},
                {"FirstName", user.FirstName},
                {"LastName",user.LastName}
            };
            return new AuthenticationProperties(data);
        }

        public override Task TokenEndpoint(OAuthTokenEndpointContext context)
        {
            foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
            {
                context.AdditionalResponseParameters.Add(property.Key, property.Value);
            }
            return base.TokenEndpoint(context);
        }
    }
}