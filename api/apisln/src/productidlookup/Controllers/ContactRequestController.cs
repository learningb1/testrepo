using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using System.Data.SqlTypes;

using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Serialization;

namespace productidlookup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactRequestController : ControllerBase
    {

        
       [HttpPost]
        public JsonResult CreateEntry([FromBody] ContactRequestModel data)
        {
            string retval = "ok";

                DriveApiService service = new DriveApiService();

            
                service.UpdateQueriesSheet(data.Name,
                                        data.EmailAddress,
                                        data.PhoneNumber,
                                        data.Subject,
                                        data.Message,
                                        data.RequestSource);


                //"JJDistributor.Content@gmail.com"
                string OwnerContactEmailBodyString = 
                                GetOwnerContactEmailBodyString(data);

                string CustomerContactEmailBodyString = 
                                GetCustomerContactEmailBodyString(data);                                

                List<string> owneremails = new List<string>();

                owneremails.Add("JJDistributor.Content@gmail.com");

                List<string> receipientemails = new List<string>();

                receipientemails.Add(data.EmailAddress);

                service.SendEmail(OwnerContactEmailBodyString,
                                  "Enquiry Received",
                                  owneremails,
                                  new List<AttachmentItem>());

                service.SendEmail(CustomerContactEmailBodyString,
                                  "Enquiry Received",
                                  receipientemails,
                                  new List<AttachmentItem>());

            
             return new JsonResult(new { result = retval });;
        }

        private string GetCustomerContactEmailBodyString(ContactRequestModel model)
        {
            string result = ApplyEmailTemplate(model,"ContactRequestTemplate.htm");

            return result;
        }

        private string GetOwnerContactEmailBodyString(ContactRequestModel model)
        {
            string result = ApplyEmailTemplate(model,"OwnerCustomerRequestTemplate.htm");

            return result;
        }

        private string ApplyEmailTemplate(ContactRequestModel model,string filename)
        {
/*
<p>Enquiry Type: &lt;NONE-ENQ-TYPE&gt;</p>
<p>Name: &lt;NONE-NAME&gt;</p>
<p>Email: &lt;NONE-EMAIL-ADDRESS&gt;</p>
<p>Subject: &lt;NONE-SUBJECT&gt;</p>
<p>Message: &lt;NONE-MESSAGE&gt;</p>
<p>DateReceived: &lt;NONE-DATE-RECEIVED&gt;</p>
*/

            string retval = string.Empty;
            retval = System.IO.File.ReadAllText(filename);
            //retval = System.IO.File.ReadAllText(@"D:\home\site\wwwroot\" + filename);
            
            retval = retval.Replace("NONE-NAME", model.Name);
            retval = retval.Replace("NONE-ENQ-TYPE", model.RequestSource);
            retval = retval.Replace("NONE-EMAIL-ADDRESS", model.EmailAddress);
            retval = retval.Replace("NONE-SUBJECT", model.Subject);
            retval = retval.Replace("NONE-DATE-RECEIVED", DateTime.Now.ToShortDateString());
            retval = retval.Replace("NONE-MESSAGE", model.Message);
            return retval;
        }
        
    }


}