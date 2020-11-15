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
    public class RegistrationUploadController : ControllerBase
    {

        
       [HttpPost]
        public JsonResult CreateEntry([FromBody] RegistrationModel data)
        {
            string retval = "ok";

             if (!ProductIdValidationController.ValidateProductId(data.SerialNumber))
            {
                retval  ="Invalid ProductId";
                return new JsonResult(new { result = retval });
            }


            string details = 
                        System.IO.File.ReadAllText(@"D:\home\site\wwwroot\" + "private.p12");

            MemoryStream image = ConvertFromBase64(data.ImageString);

            //saving data in google drive.
            //try
            //{
                DriveApiService service = new DriveApiService();

                 string filename1 =    data.SerialNumber 
                          + "-" + data.LastName
                          + "-" + data.EmailAddress
                          + "-" + data.FileName;

                string urllink = 
                service.UploadRegistrationDocument(image,
                                       filename1);

                service.UpdateRegistrationSheet(data.SerialNumber,
                                                data.PurchaseDate,
                                                data.FirstName,
                                                data.LastName,
                                                data.DateofBirth,
                                                data.EmailAddress,
                                                data.AddressLine1,
                                                data.AddressLine2,
                                                data.City,
                                                data.State,
                                                data.ZipCode,
                                                data.Country,
                                                urllink,
                                                DateTime.Now.ToShortDateString());                                       

                //"JJDistributor.Content@gmail.com"
                string ownerregistrationemailbodystring = 
                                GetOwnerRegistrationEmailBodyString(data,urllink);
                string customerregistrationemailbodystring = 
                                GetCustomerRegistrationEmailBodyString(data,urllink);   

                AttachmentItem item = PackageImage(image,data);

                List<AttachmentItem> items = new List<AttachmentItem>();
                items.Add(item);

                List<string> owneremails = new List<string>();

                owneremails.Add("JJDistributor.Content@gmail.com");

                List<string> receipientemails = new List<string>();

                receipientemails.Add(data.EmailAddress);

                service.SendEmail(ownerregistrationemailbodystring,
                                  "Registration Received",
                                  owneremails,
                                  items);
                service.SendEmail(customerregistrationemailbodystring,
                                  "Registration Received",
                                  receipientemails,
                                  new List<AttachmentItem>());

            //}

            // catch(Exception ex)
            // {
            //     retval = "Error";
            // }

                        
            
             return new JsonResult(new { result = retval });;
        }

        

        private AttachmentItem PackageImage(MemoryStream memoryStream, RegistrationModel model)
        {
            AttachmentItem item = new AttachmentItem();
            MemoryStream m = new MemoryStream();
            m.Seek(0,SeekOrigin.Begin);
            memoryStream.Seek(0,SeekOrigin.Begin);
            memoryStream.CopyTo(m);
            m.Seek(0,SeekOrigin.Begin);
            memoryStream.Seek(0,SeekOrigin.Begin);
            item.Content = m;
            item.MimeType= DriveApiService.GetMimeType(Path.GetExtension(model.FileName));
            item.Name = model.FileName;

            return item;
        }
        private string GetOwnerRegistrationEmailBodyString(RegistrationModel model,string urllink)
        {
            string result = ApplyEmailTemplate(model,"OwnerRegistrationRequestTemplate.htm",urllink);

            return result;
        }

        private string GetOwnerWarrantyEmailBodyString(RegistrationModel model,string urllink)
        {
            string result = ApplyEmailTemplate(model,"OwnerWarrantyClaimRequestTemplate.htm",urllink);

            return result;
        }

        private string GetCustomerRegistrationEmailBodyString(RegistrationModel model,string urllink)
        {
            string result = ApplyEmailTemplate(model,"CustomerRegistrationRequestTemplate.htm",urllink);
            return result;
        }

        private string GetCustomerWarrantyEmailBodyString(RegistrationModel model,string urllink)
        {
            string result = ApplyEmailTemplate(model,"CustomerWarrantyTemplate.htm",urllink);
            return result;
        } 

        private string ApplyEmailTemplate(RegistrationModel model,string filename,string urllink)
        {
            string retval = string.Empty;
            retval = System.IO.File.ReadAllText(@"D:\home\site\wwwroot\" + filename);
            
            retval = retval.Replace("NONE-LAST-NAME", model.LastName);
            retval = retval.Replace("NONE-EMAIL-ADDRESS", model.EmailAddress);
            retval = retval.Replace("NONE-SERIAL-NUM", model.SerialNumber);
            retval = retval.Replace("NONE-DATE", DateTime.Now.ToShortDateString());
            retval = retval.Replace("NONE-ZIP-CODE", model.ZipCode);
            retval = retval.Replace("NONE-LINK-TO-UPLOADED-CODE",urllink);
            return retval;
        }

        private MemoryStream ConvertFromBase64(string base64encodedstring)
        {
            MemoryStream stream;

            var bytes = Convert.FromBase64String(base64encodedstring);

            stream = new MemoryStream(bytes);
            stream.Seek(0,SeekOrigin.Begin);

            return stream;
        }

        
    }


}