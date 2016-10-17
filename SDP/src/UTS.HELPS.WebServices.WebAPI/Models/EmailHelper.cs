using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace UTS.HELPS.WebServices.WebAPI.Models
{
    public class EmailHelper
    {
        public async static Task sendEmailAsync(string subject, string body)
        {
            Task Email =  Task.Run(() => sendEmail(subject, body));
        }
        public static void sendEmail(string subject, string body)
        {
            var fromAddress = new MailAddress("sdpemail2@gmail.com", "SDP Service");
            var toAddress = new MailAddress("timothypurchas007@gmail.com", "Tim P");
            const string fromPassword = "SDPtesttest";

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, fromPassword),
                Timeout = 20000
            };
            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body
            })
            {
                smtp.Send(message);
            }
        }
    }
}
