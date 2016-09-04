﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using UTS.HELPS.WebServices.WebAPI.Responses;
using UTS.HELPS.WebServices.WebAPI.Constants;

namespace UTS.HELPS.WebServices.WebAPI.Controllers.Auth
{
    [RoutePrefix("api/account")]
    public class AccountController : BaseController
    {
        private AuthRepository auth = null;

        public AccountController()
        {
            auth = new AuthRepository();
        }

        // POST api/Account/Register
        [AllowAnonymous]
        [Route("register")]
        public async Task<AuthResponse> Register(UserModel userModel)
        {
            try
            {
                base.CheckApplicationKey();
                IdentityResult result = await auth.RegisterUser(userModel);
                return GetResponse(result);
            }
            catch (Exception ex)
            {
                string msg = base.CreateExceptionMessage(ex);
                return new AuthResponse()
                {
                    IsSuccess = false,
                    DisplayMessage = string.Format(ErrorMessages.AUTH_ERROR_REG_CATCH, msg)
                };
            }
        }

        private AuthResponse GetResponse(IdentityResult result)
        {
            AuthResponse response = new AuthResponse();
            if (result.Succeeded)
            {
                response.IsSuccess = true;
            }
            else
            {
                response.IsSuccess = false;
                response.DisplayMessage = ErrorMessages.AUTH_ERROR_REG;

                foreach (string error in result.Errors)
                    response.errors.Add(error);
            }
            return response;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                auth.Dispose();
            }

            base.Dispose(disposing);
        }
    }
}