using System;
using System.ComponentModel.DataAnnotations;
using System.IO;

public class WholesalersRequestModel
{
   
    [Required(ErrorMessage = "Business Name is required.")]
    public string BusinessName;

    [Required(ErrorMessage = "Address Line 1 is required.")]
    public string AddressLine1;

    [Required(ErrorMessage = "Address Line 2 is required.")]
    public string AddressLine2;

    public string City;
    
    public string State;

    [Required(ErrorMessage = "ZipCode is required.")]
    [MinLength(5, ErrorMessage = "Zipcode cannot be less than 5 characters.")]

    public string ZipCode;

    [Required(ErrorMessage = "Business Phone Number is required.")]
    public string BusinessPhoneNumber;

    [Required(ErrorMessage = "Email Address is required.")]
    public string EmailAddress;

    [Required(ErrorMessage = "Contact Name is required.")]
    public string ContactName;


    [Required(ErrorMessage = "Federal Tax Identification Number")]
    public string FederalBusinessTaxId;


    [EnsureMinimumElementsAttribute(1,ErrorMessage = "Need atleast one state registration")]
    public StateTaxRegistration[] StateRegistrations;

    
    [Required(ErrorMessage = "Subject is required.")]
    public string Subject;

    [Required(ErrorMessage = "Message is required.")]
    public string Message;

    
}

public class StateTaxRegistration
{
     [Required(ErrorMessage = "State Sales Tax Id Number")]
    public string StateSalesTaxId;

    [Required(ErrorMessage = "State Selected")]
    public string StateSelected;

    [Required(ErrorMessage = "File Name Required")]
    public string FileName;

    [Required(ErrorMessage = "Image File Data Required")]
    public string ImgFileData;

}


public class StateTaxRegistrationInternal : StateTaxRegistration
{

    MemoryStream memstream_;

    public StateTaxRegistrationInternal(StateTaxRegistration registration, 
                                        string fedtaxid,
                                        string businessname)
    {

        this.FileName = registration.FileName;
        this.StateSalesTaxId = registration.StateSalesTaxId;
        this.StateSelected = registration.StateSelected;
        
        this.InternalFilename = 
                           DateTime.Now.Ticks
                          + "-"  
                          + fedtaxid 
                          + "-"  
                          + registration.StateSalesTaxId
                          + "-"
                          + registration.StateSelected
                          + "-"
                          + businessname
                          + "-"
                          + registration.FileName;

        this.memstream_ = ImageHelpers.ConvertFromBase64(registration.ImgFileData);

        this.UploadedUrl = string.Empty;
    }

    public string InternalFilename;

    public MemoryStream InternalMemStream
    {
        get
        {
            if (memstream_!= null)
            {
                memstream_.Seek(0,SeekOrigin.Begin);
            }

            return memstream_;
        }
    }

    public string UploadedUrl;
}

public class EnsureMinimumElementsAttribute : ValidationAttribute
{
    private readonly int mincount_;
    public EnsureMinimumElementsAttribute(int mincount)
    {
        mincount = mincount_;
    }

    public override bool IsValid(object value)
    {
        var arr = value as StateTaxRegistration[];

        if (arr == null)
        {
            return false;
        }

        if (arr.Length < 1)
        {
            return false;
        }

        return true;
    }
}