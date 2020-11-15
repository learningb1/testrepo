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
    public class WarrantyUploadController : ControllerBase
    {

        
       [HttpPost]
        public JsonResult CreateEntry([FromBody] WarrantyClaimModel data)
        {
            string retval = "ok";

            if (!ProductIdValidationController.ValidateProductId(data.SerialNumber))
            {
                retval  ="Invalid ProductId";
                return new JsonResult(new { result = retval });
            }


            string details = 
                        System.IO.File.ReadAllText(@"D:\home\site\wwwroot\" + "private.p12");


            using(MemoryStream receiptimage = ConvertFromBase64(data.ReceiptImageString))
            using(MemoryStream serialnumberimage = ConvertFromBase64(data.SerialNumberImageString))
            {

            //saving data in google drive.
            try
            {
                DriveApiService service = new DriveApiService();

                 string receiptfilename = "Receipt"
                          + "-" + data.SerialNumber 
                          + "-" + data.LastName
                          + "-" + data.EmailAddress
                          + "-" + data.ReceiptFileName;

                  string serialnumberfilename = "SerialNumber"
                          + "-" + data.SerialNumber 
                          + "-" + data.LastName
                          + "-" + data.EmailAddress
                          + "-" + data.ReceiptFileName;                          

                string receipturllink = 
                service.UploadWarrantyClaimDocument(receiptimage,
                                       receiptfilename);

                string serialnumlink = 
                service.UploadWarrantyClaimDocument(serialnumberimage,
                                       serialnumberfilename);
                                       

                service.UpdateWarrantyClaimSheet(data.SerialNumber,
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
                                                data.ClaimReason,
                                                receipturllink,
                                                serialnumlink,
                                                DateTime.Now.ToShortDateString());                                       

                //"JJDistributor.Content@gmail.com"
                string ownerwarrantyemailbodystring = 
                                GetOwnerWarrantyEmailBodyString(data,receipturllink,serialnumlink);
                string customerwarrantyemailbodystring = 
                                GetCustomerWarrantyEmailBodyString(data,receipturllink,serialnumlink);   

                AttachmentItem itemreceipt = PackageImage(receiptimage,receiptfilename);
                AttachmentItem itemserialnumber = PackageImage(serialnumberimage,serialnumberfilename);

                List<AttachmentItem> items = new List<AttachmentItem>();
                items.Add(itemreceipt);
                items.Add(itemserialnumber);

                List<string> owneremails = new List<string>();

                owneremails.Add("JJDistributor.Content@gmail.com");

                List<string> receipientemails = new List<string>();

                receipientemails.Add(data.EmailAddress);

                service.SendEmail(ownerwarrantyemailbodystring,
                                  "Warranty Claim Received",
                                  owneremails,
                                  items);
                service.SendEmail(customerwarrantyemailbodystring,
                                  "Warranty Claim Received",
                                  receipientemails,
                                  new List<AttachmentItem>());

            }

            catch(Exception ex)
             {
                 retval = "Error";
             }

        }     
            
             return new JsonResult(new { result = retval });
        }

        

        private AttachmentItem PackageImage(MemoryStream memoryStream,string orgfilename)
        {
            AttachmentItem item = new AttachmentItem();
            MemoryStream m = new MemoryStream();
            m.Seek(0,SeekOrigin.Begin);
            memoryStream.Seek(0,SeekOrigin.Begin);
            memoryStream.CopyTo(m);
            m.Seek(0,SeekOrigin.Begin);
            memoryStream.Seek(0,SeekOrigin.Begin);
            item.Content = m;
            item.MimeType= DriveApiService.GetMimeType(Path.GetExtension(orgfilename));
            item.Name = orgfilename;

            return item;
        }
        
        private string GetOwnerWarrantyEmailBodyString(WarrantyClaimModel model,
                                                       string receipturllink,
                                                       string serialnumberlink)
        {
            string result = ApplyEmailTemplate(model,"OwnerWarrantyClaimRequestTemplate.htm",receipturllink,serialnumberlink);

            return result;
        }

        private string GetCustomerWarrantyEmailBodyString(WarrantyClaimModel model,
                                          string receipturllink,
                                          string serialnumberlink)
        {
            string result = ApplyEmailTemplate(model,"CustomerWarrantyTemplate.htm",receipturllink,serialnumberlink);
            return result;
        } 

        private string ApplyEmailTemplate(WarrantyClaimModel model,
                                          string filename,
                                          string receipturllink,
                                          string serialnumberlink)
        {
            string retval = string.Empty;
            retval = System.IO.File.ReadAllText(@"D:\home\site\wwwroot\" + filename);
            
            retval = retval.Replace("NONE-LAST-NAME", model.LastName);
            retval = retval.Replace("NONE-EMAIL-ADDRESS", model.EmailAddress);
            retval = retval.Replace("NONE-SERIAL-NUM", model.SerialNumber);
            retval = retval.Replace("NONE-DATE", DateTime.Now.ToShortDateString());
            retval = retval.Replace("NONE-ZIP-CODE", model.ZipCode);
            retval = retval.Replace("NONE-LINK-TO-SERIALNUM-UPLOADED-CODE",serialnumberlink);
            retval = retval.Replace("NONE-LINK-TO-RECEIPTNUM-UPLOADED-CODE",receipturllink);
            retval = retval.Replace("NONE-CLAIM-REASON",model.ClaimReason);
            
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