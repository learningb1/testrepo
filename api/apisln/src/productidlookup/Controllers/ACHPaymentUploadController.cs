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
using productidlookup;

namespace productidlookup.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ACHPaymentUploadController : ControllerBase
    {

        
       [HttpPost]
        public JsonResult CreateEntry([FromBody] ACHPaymentUploadModel data)
        {
            string retval = "ok";

            string details = 
                        System.IO.File.ReadAllText("private.p12");

            string voidcheckfilename =  "voidcheck"
                                       + "-" + System.DateTime.Now.Ticks     
                                       + "-" + data.FEIN
                                       + "-" + data.CompanyName
                                       + "-" + data.VoidCheckFileName;

            try
            {
                using(MemoryStream voidcheck = ImageHelpers.ConvertFromBase64(data.VoidCheckImageString))
                {

                    DriveApiService service = new DriveApiService();

                    string voidcheckfileurl =
                            service.UploadVoidCheckDocument(voidcheck,voidcheckfilename);

                    service.UploadACHPaymentRequest(data.CompanyName,
                                                    data.ContactName,
                                                    data.BankName,
                                                    data.AccountType,
                                                    data.BankRoutingNumber,
                                                    data.BankRoutingVerified,
                                                    data.BankAccountNumber,
                                                    data.EmailAddress,
                                                    data.AddressLine1,
                                                    data.AddressLine2,
                                                    data.City,
                                                    data.State,
                                                    data.PrintedName,
                                                    data.TitleName,
                                                    data.FEIN,
                                                    data.datesigned,
                                                    data.ZipCode,
                                                    voidcheckfileurl,
                                                    data.CommentsOrMessage,
                                                    data.Source);         


                    string ownerachemailbodystring = 
                                GetOwnerACHEmailBodyString(data,voidcheckfileurl);
                    string customerachemailbodystring = 
                                GetCustomerACHEmailBodyString(data);

                    AttachmentItem itemvoidcheck = PackageImage(ImageHelpers.ConvertFromBase64(data.VoidCheckImageString),
                                                               data.VoidCheckFileName);      

                    List<AttachmentItem> items = new List<AttachmentItem>();
                    items.Add(itemvoidcheck);

                    List<string> owneremails = new List<string>();

                    owneremails.Add("JJDistributor.Content@gmail.com");

                    List<string> receipientemails = new List<string>();

                    receipientemails.Add(data.EmailAddress);

                    service.SendEmail(ownerachemailbodystring,
                                  "ACH Request Received",
                                  owneremails,
                                  items);
                    service.SendEmail(customerachemailbodystring,
                                  "ACH Request Received",
                                  receipientemails,
                                  new List<AttachmentItem>());
                
                }
            }

            catch(Exception ex)
            {
                retval = "Error";
            }

            return new JsonResult(new { result = retval });

        }

        private AttachmentItem PackageImage(MemoryStream memoryStream,string orgfilename)
        {
            AttachmentItem item = new productidlookup.AttachmentItem();
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
        
        private string GetOwnerACHEmailBodyString(ACHPaymentUploadModel model,
                                                  string achuploadlink)
        {
            string result = ApplyEmailTemplate(model,
                                              "OwnerACHRequestTemplate.htm",
                                              achuploadlink);

            return result;
        }

        private string GetCustomerACHEmailBodyString(ACHPaymentUploadModel model)
        {
            string result = ApplyEmailTemplate(model,"CustomerACHRequestTemplate.htm","");
            return result;
        } 

        /*
            <p>ACH Payment Submission Request Received</p>
        <p>Business Name: &lt;NONE-BIZ-NAME&gt;</p>
        <p>Contact Name: &lt;NONE-NAME&gt;</p>
        <p>FEIN: &lt;NONE-FEIN&gt;</p>
        <p>EMAIL ADDRESS: &lt;NONE-EMAIL-ADDRESS&gt;</p>
        <p>DATE Received:&lt;NONE-DATE&gt;</p>
        <p>ZIP CODE:&lt;NONE-ZIP-CODE&gt;</p>
        <p>MESSAGE&lt;NONE-MESSAGE&gt;</p>
        <p>VOID CHECK LINK&lt;NONE-VOID-CHECK-LINK&gt;</p>
        */

        private string ApplyEmailTemplate(ACHPaymentUploadModel model,
                                          string filename,
                                          string voidcheckurllink)
        {
            string retval = string.Empty;
            retval = System.IO.File.ReadAllText(filename);
            
            retval = retval.Replace("NONE-BIZ-NAME", model.CompanyName);
            retval = retval.Replace("NONE-NAME", model.ContactName);
            retval = retval.Replace("NONE-FEIN", model.FEIN);
            retval = retval.Replace("NONE-EMAIL-ADDRESS", model.EmailAddress);
            retval = retval.Replace("NONE-DATE", DateTime.Now.ToShortDateString());
            retval = retval.Replace("NONE-ZIP-CODE", model.ZipCode);
            retval = retval.Replace("NONE-MESSAGE",model.CommentsOrMessage);
            retval = retval.Replace("NONE-VOID-CHECK-LINK",voidcheckurllink);
            
            return retval;
        }
        
    }
}
