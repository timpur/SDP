using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using UTS.HELPS.WebServices.DataObjects.Enums;

namespace UTS.HELPS.WebServices.WebAPI.Controllers.Auth
{
    public class UserModel
    {
        [Required]
        [Display(Name = "User name")]
        public string UserName { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        [Required]
        [Display(Name = "First Name")]
        public string FirstName { get; set; }
        [Required]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Required]
        [Display(Name = "Degree")]
        public Degree Degree { get; set; }

        [Required]
        [Display(Name = "Year")]
        public Year Year { get; set; }
        [Required]
        [Display(Name = "Status")]
        public Status Status { get; set; }

        [Required]
        [Display(Name = "First Language")]
        public string FirstLanguage { get; set; }

        [Required]
        [Display(Name = "Country Origin")]
        public string CountryOrigin { get; set; }
    }
}