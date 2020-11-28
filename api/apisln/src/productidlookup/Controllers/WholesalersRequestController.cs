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
    public class WholesalersRequestController : ControllerBase
    {

        
       [HttpPost]
        public JsonResult CreateEntry([FromBody] WholesalersRequestModel data)
        {
            string retval = "ok";

                DriveApiService service = new DriveApiService();

                if (!ModelState.IsValid)
                {
                    new JsonResult(new { result = "Bad Data" });
                }

                List<StateTaxRegistrationInternal> internalregs = 
                            new  List<StateTaxRegistrationInternal>();


                // this.InternalFilename = 
                //            DateTime.Now.Ticks
                //           + "-"  
                //           + fedtaxid 
                //           + "-"  
                //           + registration.StateSalesTaxId
                //           + "-"
                //           + registration.StateSelected
                //           + "-"
                //           + businessname
                //           + "-"
                //           + registration.FileName;

                string feinfilename = DateTime.Now.Ticks 
                                      + "-"
                                      + data.FederalBusinessTaxId
                                      + "-"
                                      + data.BusinessName
                                      + "-"
                                      + data.FEINFileName;
                string feinfileurl = string.Empty;
                using(MemoryStream ms = ImageHelpers.ConvertFromBase64(data.FEINImageString))
                {
                    feinfileurl = service.UploadWholesalerDocument(ms,feinfilename);
                }

                foreach(StateTaxRegistration reg in data.StateRegistrations)
                {
                    StateTaxRegistrationInternal internalreg = 
                            new StateTaxRegistrationInternal(reg,
                                                             data.FederalBusinessTaxId,
                                                             data.BusinessName);

                        internalregs.Add(internalreg);
                }


                foreach(StateTaxRegistrationInternal inregs in internalregs)
                {
                    inregs.UploadedUrl = 
                      service.UploadWholesalerDocument(inregs.InternalMemStream,inregs.InternalFilename);                         
                }
                

                service.UpdateWholesalerQueriesSheet(data, internalregs,feinfileurl);
            
                
                //"JJDistributor.Content@gmail.com"
                string OwnerContactEmailBodyString = 
                                GetOwnerContactEmailBodyString(data,internalregs);

                string CustomerContactEmailBodyString = 
                                GetCustomerContactEmailBodyString(data);                                

                List<string> owneremails = new List<string>();

                owneremails.Add("JJDistributor.Content@gmail.com");

                List<string> receipientemails = new List<string>();

                receipientemails.Add(data.EmailAddress);

                List<AttachmentItem> attachments = PackageImages(internalregs);

                service.SendEmail(OwnerContactEmailBodyString,
                                  "Wholesaler Enquiry Received",
                                  owneremails,
                                  attachments);

                service.SendEmail(CustomerContactEmailBodyString,
                                  "Wholesaler Enquiry Received",
                                  receipientemails,
                                  new List<AttachmentItem>());

            
             return new JsonResult(new { result = retval });
        }

        private string GetCustomerContactEmailBodyString(WholesalersRequestModel model)
        {
            string result = ApplyEmailTemplate("WholesalerRequestTemplate.htm", model,new List<StateTaxRegistrationInternal>());

            return result;
        }

        private string GetOwnerContactEmailBodyString(WholesalersRequestModel model, List<StateTaxRegistrationInternal> intregs)
        {
            string result = ApplyEmailTemplate("OwnerWholesalerRequestTemplate.htm",model, intregs);

            return result;
        }

        private string ApplyEmailTemplate(string filename, WholesalersRequestModel model,List<StateTaxRegistrationInternal> internalregs)
        {
            /*
            <p>Wholesaler Enquiry Request Received</p>
            <p>Business Name: &lt;NONE-BIZ-NAME&gt;</p>
            <p>Contact Name: &lt;NONE-NAME&gt;</p>
            <p>EMAIL ADDRESS: &lt;NONE-EMAIL-ADDRESS&gt;</p>
            <p>CONTACT PHONE NUMBER: &lt;NONE-PHONE-NUMBER&gt;</p>
            <p>DATE Received:&lt;NONE-DATE&gt;</p>
            <p>ZIP CODE OF THE WHOLESALER:&lt;NONE-ZIP-CODE&gt;</p>
            <p>FEIN THE WHOLESALER:&lt;NONE-FEIN&gt;</p>
            &lt;NONE-SALESTAX-DETAIL&gt;
            <p>SUBJECT:&lt;NONE-SUBJECT&gt;</p>
            <p>MESSAGE&lt;NONE-MESSAGE&gt;</p>
            */

            string retval = string.Empty;
            retval = System.IO.File.ReadAllText(filename);
            //retval = System.IO.File.ReadAllText(@"D:\home\site\wwwroot\" + filename);
            
            retval = retval.Replace("NONE-BIZ-NAME", model.BusinessName);
            retval = retval.Replace("NONE-NAME", model.ContactName);
            retval = retval.Replace("NONE-EMAIL-ADDRESS", model.EmailAddress);
            retval = retval.Replace("NONE-SUBJECT", model.Subject);
            retval = retval.Replace("NONE-DATE", DateTime.Now.ToShortDateString());
            retval = retval.Replace("NONE-PHONE-NUMBER", model.BusinessPhoneNumber);
            retval = retval.Replace("NONE-ZIP-CODE", model.ZipCode);
            retval = retval.Replace("NONE-FEIN", model.FederalBusinessTaxId);
            retval = retval.Replace("NONE-MESSAGE", model.Message);
            string salesstring = string.Empty;

            foreach(StateTaxRegistrationInternal intregs in internalregs)
            {
                string templatestring = "<p>Sales Tax Id: NONE-SALES-TAX-ID, State: NONE-SALES-STATE, License: NONE-SALES-LICENSE-URL</p>";
                templatestring = templatestring.Replace("NONE-SALES-TAX-ID",intregs.StateSalesTaxId);
                templatestring = templatestring.Replace("NONE-SALES-STATE",intregs.StateSelected);
                templatestring = templatestring.Replace("NONE-SALES-LICENSE-URL",intregs.UploadedUrl);
                salesstring+= templatestring;
            }

            retval = retval.Replace("NONE-SALESTAX-DETAIL",salesstring);
            
            return retval;
        }

        private List<AttachmentItem> PackageImages(List<StateTaxRegistrationInternal> internalregs)
        {

            List<AttachmentItem> items = new List<AttachmentItem>();

            foreach(StateTaxRegistrationInternal inreg in internalregs)
            {
                AttachmentItem aitem = new AttachmentItem();
                MemoryStream m = new MemoryStream();
                m.Seek(0,SeekOrigin.Begin);
                inreg.InternalMemStream.CopyTo(m);
                m.Seek(0,SeekOrigin.Begin);
                aitem.Content = m;
                aitem.MimeType= DriveApiService.GetMimeType(Path.GetExtension(inreg.FileName));
                aitem.Name = inreg.FileName;    
                items.Add(aitem);    
            }

            
            return items;
        }
        
    }


}