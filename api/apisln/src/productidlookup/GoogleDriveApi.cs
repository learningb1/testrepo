using Google.Apis.Auth.OAuth2;
using Google.Apis.Drive.v3;
using Google.Apis.Drive.v3.Data;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using Google.Apis.Util.Store;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.StaticFiles;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace productidlookup
{
    public class DriveApiService
    {

          protected string _registrationcontentfolderid = "15OnF0EjJD7uHezlvBAeXxWOtZUt2D9B_";
        protected string _warrantyclaimcontentfolderid = "13vqH-pHFenIqVbZMbEzwwd7zT81M3WO1";

        protected string _registrationsheetid = "147eMlUBaUebjyxIeUTNPDYCqREjOUEo8R3dA8xuOa-Q";

        protected string _warrantyclaimsheetid  = "1FgKDsP4LCZDXviuGIYq4Wge0cTr-V8xQv1HIuEso8qQ";

        protected string _wholesalerinfofolderid = "18MzP-bztxG_oNE1obVZHRU-QfrVQMbwk";

        protected string urllink = "https://drive.google.com/file/d/";

        protected ServiceAccountCredential credential;

        protected string applicationname = "mymyvape-test";

        protected DriveService service;


        public DriveApiService()
        {

            string[] scopes = new string[] { DriveService.Scope.Drive };
            var certificate = 
                    new X509Certificate2(@"private.p12",
                                        "notasecret",
                                        X509KeyStorageFlags.MachineKeySet);
            credential = new ServiceAccountCredential(
                new ServiceAccountCredential.Initializer("mymy-test@quickstart-1605114865611.iam.gserviceaccount.com")
                {
                    Scopes = scopes
                }.FromCertificate(certificate));

            service = new DriveService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = "mymy-test"
            });

        }

        public void UpdateWholesalerQueriesSheet(WholesalersRequestModel request,
                                                List<StateTaxRegistrationInternal> internals)
        {
             SheetsService sheetsService = new SheetsService(new BaseClientService.Initializer
            {
                HttpClientInitializer = credential,
                ApplicationName = "Google-SheetsSample/0.1",
            });

            var range = string.Empty;
            
            range = @"WholesalerEnquiriesOne!A:CZ";

            var valueRange = new ValueRange();

            var oblist = new List<object>();
            
                oblist.Add(DateTime.Now.ToShortDateString());
                oblist.Add(String.IsNullOrEmpty(request.BusinessName) ? "": request.BusinessName);
                oblist.Add(String.IsNullOrEmpty(request.ContactName) ? "": request.ContactName);
                oblist.Add(String.IsNullOrEmpty(request.AddressLine1) ? "": request.AddressLine1);
                oblist.Add(String.IsNullOrEmpty(request.AddressLine2) ? "": request.AddressLine2);
                oblist.Add(String.IsNullOrEmpty(request.City) ? "": request.City);
                oblist.Add(String.IsNullOrEmpty(request.State) ? "": request.State);
                oblist.Add(String.IsNullOrEmpty(request.ZipCode) ? "": request.ZipCode);
                oblist.Add(String.IsNullOrEmpty(request.BusinessPhoneNumber) ? "": request.BusinessPhoneNumber);
                oblist.Add(String.IsNullOrEmpty(request.EmailAddress) ? "": request.EmailAddress);
                oblist.Add(String.IsNullOrEmpty(request.ContactName) ? "": request.ContactName);
                oblist.Add(String.IsNullOrEmpty(request.Subject) ? "": request.Subject);
                oblist.Add(String.IsNullOrEmpty(request.Message) ? "": request.Message);
                oblist.Add(String.IsNullOrEmpty(request.FederalBusinessTaxId) ? "": request.FederalBusinessTaxId);
                
                foreach (var item in internals)
                {
                        oblist.Add(String.IsNullOrEmpty(item.StateSalesTaxId) ? "": item.StateSalesTaxId);
                        oblist.Add(String.IsNullOrEmpty(item.StateSelected) ? "": item.StateSelected);
                        oblist.Add(String.IsNullOrEmpty(item.UploadedUrl) ? "": item.UploadedUrl);
                }
          
      
            
            valueRange.Values = new List<IList<object>> { oblist };


            Google.Apis.Sheets.v4.Data.ValueRange requestBody = 
                                new Google.Apis.Sheets.v4.Data.ValueRange();

            var appendRequest = 
                sheetsService.Spreadsheets.Values.Append(valueRange, _registrationsheetid, range);
            appendRequest.ValueInputOption = 
                SpreadsheetsResource.ValuesResource.AppendRequest.ValueInputOptionEnum.USERENTERED;

            // To execute asynchronously in an async method, replace `request.Execute()` as shown:
            Google.Apis.Sheets.v4.Data.AppendValuesResponse response = appendRequest.Execute();
        }



        public void UpdateQueriesSheet(string name,
                                               string emailaddress,
                                               string phonenumber,
                                               string subject,
                                               string message,
                                               string requesttype)
        {
             SheetsService sheetsService = new SheetsService(new BaseClientService.Initializer
            {
                HttpClientInitializer = credential,
                ApplicationName = "Google-SheetsSample/0.1",
            });

            var range = string.Empty;
            
            if (requesttype.Equals("Wholesalers"))
            {
                range = @"WholesalerEnquiries!A:F";
            }
            else
            {
                range = @"CustomerQueries!A:F";
            }
            
            
            var valueRange = new ValueRange();

            var oblist = new List<object>()
            {
                String.IsNullOrEmpty(name) ? "": name,
                String.IsNullOrEmpty(emailaddress)? "" : emailaddress,
                String.IsNullOrEmpty(phonenumber)? "" : phonenumber,
                String.IsNullOrEmpty(subject)? "" : subject,
                String.IsNullOrEmpty(message)? "" : message,
                DateTime.Now.ToShortDateString()
          };
      
            
            valueRange.Values = new List<IList<object>> { oblist };


            Google.Apis.Sheets.v4.Data.ValueRange requestBody = 
                                new Google.Apis.Sheets.v4.Data.ValueRange();

            var appendRequest = 
                sheetsService.Spreadsheets.Values.Append(valueRange, _registrationsheetid, range);
            appendRequest.ValueInputOption = 
                SpreadsheetsResource.ValuesResource.AppendRequest.ValueInputOptionEnum.USERENTERED;

            // To execute asynchronously in an async method, replace `request.Execute()` as shown:
            Google.Apis.Sheets.v4.Data.AppendValuesResponse response = appendRequest.Execute();
        }

        public void UpdateRegistrationSheet(string SerialNumber,
            string PurchaseDate,
            string FirstName,
            string LastName,
            string DateofBirth,
            string EmailAddress,
            string AddressLine1,
            string AddressLine2,
            string City,
            string State,
            string ZipCode,
            string Country,
            string ContentLink,
            string DateRegistered)
        {
            /*
            string SerialNumber,
            string PurchaseDate,
            string FirstName,
            string LastName,
            string DateofBirth,
            string EmailAddress,
            string AddressLine1,
            string AddressLine 2,
            string City,
            string State,
            string ZipCode,
            string Country,
            string ContentLink,
            string DateRegistered,
            */
            
            SheetsService sheetsService = new SheetsService(new BaseClientService.Initializer
            {
                HttpClientInitializer = credential,
                ApplicationName = "Google-SheetsSample/0.1",
            });

            var range = @"RegistrationMain!A:N";
            var valueRange = new ValueRange();

            var oblist = new List<object>()
            {
                String.IsNullOrEmpty(SerialNumber) ? "": SerialNumber,
                String.IsNullOrEmpty(PurchaseDate)? "" : PurchaseDate,
                String.IsNullOrEmpty(FirstName)? "" : FirstName,
                String.IsNullOrEmpty(LastName)? "" : LastName,
                String.IsNullOrEmpty(DateofBirth)? "" : DateofBirth,
                String.IsNullOrEmpty(EmailAddress)? "" : EmailAddress,
                String.IsNullOrEmpty(AddressLine1)? "" : AddressLine1,
                String.IsNullOrEmpty(AddressLine2)? "" : AddressLine2,
                String.IsNullOrEmpty(City)? "" : City,
                String.IsNullOrEmpty(State)? "" : State,
                String.IsNullOrEmpty(ZipCode)? "" : ZipCode,
                String.IsNullOrEmpty(Country)? "" : Country,
                ContentLink,
                DateRegistered
          };
        // { "1A3D5F",
        //   "12/31/2020",
        //   "Robert",
        //   "Jones",
        //   "01/01/1977",
        //   "RocketMan@gmail.com",
        //   "Rocket Man Lane",
        //   "Apt 1",
        //   "Timbuktu",
        //   "KY",
        //   "40521",
        //   "USA",
        //   "https://docs.google.com/spreadsheets/d/1FgKDsP4LCZDXviuGIYq4Wge0cTr-V8xQv1HIuEso8qQ"};
            
            valueRange.Values = new List<IList<object>> { oblist };


            Google.Apis.Sheets.v4.Data.ValueRange requestBody = 
                                new Google.Apis.Sheets.v4.Data.ValueRange();

            var appendRequest = 
                sheetsService.Spreadsheets.Values.Append(valueRange, _registrationsheetid, range);
            appendRequest.ValueInputOption = 
                SpreadsheetsResource.ValuesResource.AppendRequest.ValueInputOptionEnum.USERENTERED;

            // To execute asynchronously in an async method, replace `request.Execute()` as shown:
            Google.Apis.Sheets.v4.Data.AppendValuesResponse response = appendRequest.Execute();

        }

        public bool Search(string productid)
        {
            SheetsService sheetsService = new SheetsService(new BaseClientService.Initializer
            {
                HttpClientInitializer = credential,
                ApplicationName = "Google-SheetsSample/0.1",
            });

            var range = @"ProductIdLookup!A1";
            var valueRange = new ValueRange();

            string searchstring = "=MATCH(\"#-#$\",ProductIds!A:A, 0)";

            searchstring = searchstring.Replace("#-#$", productid.Trim());

            var oblist = new List<object>()
                            { searchstring};
            valueRange.Values = new List<IList<object>> { oblist };

            Google.Apis.Sheets.v4.Data.ValueRange requestBody =
                               new Google.Apis.Sheets.v4.Data.ValueRange();

            var appendRequest =
                sheetsService.Spreadsheets.Values.Append(valueRange, _registrationsheetid, range);
            appendRequest.ValueInputOption =
                SpreadsheetsResource.ValuesResource.AppendRequest.ValueInputOptionEnum.USERENTERED;

            // To execute asynchronously in an async method, replace `request.Execute()` as shown:
            Google.Apis.Sheets.v4.Data.AppendValuesResponse response = 
                                    appendRequest.Execute();

            string query = response.Updates.UpdatedRange;

            SpreadsheetsResource.ValuesResource.GetRequest getrequest = 
                    sheetsService.Spreadsheets.Values.Get(_registrationsheetid, query);

            ValueRange r = getrequest.Execute();
            object s = r.Values[0][0];

            return !(s as string).Contains("#");

        }


        public void UpdateWarrantyClaimSheet(string SerialNumber,
            string PurchaseDate,
            string FirstName,
            string LastName,
            string DateofBirth,
            string EmailAddress,
            string AddressLine1,
            string AddressLine2,
            string City,
            string State,
            string ZipCode,
            string Country,
            string ClaimReason,
            string ReceiptLink,
            string SerialNumberLink,
            string DateSubmitted)
        {
           
            
            SheetsService sheetsService = new SheetsService(new BaseClientService.Initializer
            {
                HttpClientInitializer = credential,
                ApplicationName = "Google-SheetsSample/0.1",
            });

            var range = @"WarrantyClaims!A:P";
            var valueRange = new ValueRange();

            var oblist = new List<object>()
            {
                String.IsNullOrEmpty(SerialNumber) ? "": SerialNumber,
                String.IsNullOrEmpty(PurchaseDate)? "" : PurchaseDate,
                String.IsNullOrEmpty(FirstName)? "" : FirstName,
                String.IsNullOrEmpty(LastName)? "" : LastName,
                String.IsNullOrEmpty(DateofBirth)? "" : DateofBirth,
                String.IsNullOrEmpty(EmailAddress)? "" : EmailAddress,
                String.IsNullOrEmpty(AddressLine1)? "" : AddressLine1,
                String.IsNullOrEmpty(AddressLine2)? "" : AddressLine2,
                String.IsNullOrEmpty(City)? "" : City,
                String.IsNullOrEmpty(State)? "" : State,
                String.IsNullOrEmpty(ZipCode)? "" : ZipCode,
                String.IsNullOrEmpty(Country)? "" : Country,
                ClaimReason,
                ReceiptLink,
                SerialNumberLink,
                DateSubmitted
          };
        // { "1A3D5F",
        //   "12/31/2020",
        //   "Robert",
        //   "Jones",
        //   "01/01/1977",
        //   "RocketMan@gmail.com",
        //   "Rocket Man Lane",
        //   "Apt 1",
        //   "Timbuktu",
        //   "KY",
        //   "40521",
        //   "USA",
        //   "https://docs.google.com/spreadsheets/d/1FgKDsP4LCZDXviuGIYq4Wge0cTr-V8xQv1HIuEso8qQ"};
            
            valueRange.Values = new List<IList<object>> { oblist };


            Google.Apis.Sheets.v4.Data.ValueRange requestBody = 
                                new Google.Apis.Sheets.v4.Data.ValueRange();

            var appendRequest = 
                sheetsService.Spreadsheets.Values.Append(valueRange, _warrantyclaimsheetid, range);
            appendRequest.ValueInputOption = 
                SpreadsheetsResource.ValuesResource.AppendRequest.ValueInputOptionEnum.USERENTERED;

            // To execute asynchronously in an async method, replace `request.Execute()` as shown:
            Google.Apis.Sheets.v4.Data.AppendValuesResponse response = appendRequest.Execute();

        }

        public string UploadRegistrationDocument(Stream stream,string filename)
        {
            string r = urllink + UploadDocument(stream,filename,_registrationcontentfolderid);
            return r;
        }


        public string UploadWholesalerDocument(Stream stream,string filename)
        {
            string r = urllink + UploadDocument(stream,filename,_wholesalerinfofolderid);
            return r;
        }



        public string UploadWarrantyClaimDocument(Stream stream,string filename)
        {
            string r = urllink + UploadDocument(stream,filename,_warrantyclaimcontentfolderid);
            return r;
        }
                                                            

        public string UploadDocument(Stream stream,
                                                                 string filename,
                                                                 string documentId)
        {

            var name = filename;
            var mimeType = GetMimeType(Path.GetExtension(filename));

            var fileMetadata = new Google.Apis.Drive.v3.Data.File()
            {
                Name = name,
                MimeType = mimeType,
                Parents = new[] { documentId }
            };

            FilesResource.CreateMediaUpload request;
            
            
            request = service.Files.Create(
                fileMetadata, stream, mimeType);
            request.Fields = "id, name, parents, createdTime, modifiedTime, mimeType, thumbnailLink";
            request.Upload();

            return request.ResponseBody.Id;
        }

        public static string GetMimeType(string extension)
        {
            string result = string.Empty;

            /*
                .bmp	Windows OS/2 Bitmap Graphics	image/bmp
                .jpeg
                .jpg	JPEG images	image/jpeg
                .png	Portable Network Graphics	image/png
                .pdf	Adobe Portable Document Format (PDF)	application/pdf
                .zip	ZIP archive	application/zip
             */

            if (extension.ToLower().Contains("bmp"))
            {
                return "image/bmp";
            }

            if (extension.ToLower().Contains("jpeg"))
            {
                return "image/jpeg";
            }

            if (extension.ToLower().Contains("pdf"))
            {
                return "application/pdf";
            }

            if (extension.ToLower().Contains("zip"))
            {
                return "application/zip";
            }


            return "application/octet-stream";
        }

        public Google.Apis.Drive.v3.Data.File Upload(Stream stream,
                                                                 string filename,
                                                                 string documentId)
        {

            var name = ($"{DateTime.UtcNow.ToString()}.{Path.GetExtension(filename)}");
            var mimeType = GetMimeType(Path.GetExtension(filename));//file.ContentType;

            var fileMetadata = new Google.Apis.Drive.v3.Data.File()
            {
                Name = name,
                MimeType = mimeType,
                Parents = new[] { documentId }
            };

            FilesResource.CreateMediaUpload request;
            
            
            request = service.Files.Create(
                fileMetadata, stream, mimeType);
            request.Fields = "id, name, parents, createdTime, modifiedTime, mimeType, thumbnailLink";
            request.Upload();

            return request.ResponseBody;
        }

        public void SendEmail(string emailbody,
                        string emailsubject,
                        List<string> receipientlist,
                        List<AttachmentItem> items)
        {
            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials =
                    new NetworkCredential("JJDistributor.Content@gmail.com",
                                          "MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALQwjnae7")
                
            };

            string addresses = string.Empty;

            foreach(string mailaddress in receipientlist)
            {
                addresses += mailaddress + ",";
            }

            if (addresses.EndsWith(","))
            {
                addresses = addresses.Remove(addresses.LastIndexOf(","));
            }


            using (var message = new MailMessage("JJDistributor.Content@gmail.com", addresses)
            {
                IsBodyHtml = true,
                Subject = emailsubject,
                Body = emailbody

            })
            {
                foreach(AttachmentItem item in items)
                {
                    item.Content.Seek(0, SeekOrigin.Begin);
                    Attachment attachment = new Attachment(item.Content, item.Name, item.MimeType);
                    message.Attachments.Add(attachment);
                }

                smtp.Send(message);
            }
        }

        

    }

    public class AttachmentItem
        {
            public string Name
            {
                get;
                set;
            }

            public string MimeType
            {
                get;
                set;
            }

            public MemoryStream Content
            {
                get;
                set;
            }
        }

}
