using System;
using System.ComponentModel.DataAnnotations;

public class WarrantyClaimModel
{
   
    [Required(ErrorMessage = "SerialNumber is required.")]
    public string SerialNumber;

    public string PurchaseDate;

    public string	FirstName;
    
    [Required(ErrorMessage = "Last Name is required.")]
    public string   LastName;

    public string DateofBirth;

    [Required(ErrorMessage = "Email Address is required.")]
    [RegularExpression(@"^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$", ErrorMessage = "Email is not valid.")]  
    public string	EmailAddress;
    
    public string AddressLine1;

    public string AddressLine2;

    public string City;
    
    public string State;

    [Required(ErrorMessage = "ZipCode is required.")]
    [MinLength(5, ErrorMessage = "Zipcode cannot be less than 5 characters.")]

    public string ZipCode;

    [Required(ErrorMessage = "Image is required.")]
    [MinLength(5, ErrorMessage = "Empty image is not acceptable")]
    public string ReceiptImageString;

    [Required(ErrorMessage = " Receipt Image File Name is required.")]
    [MinLength(5, ErrorMessage = "Receipt image File Name is not acceptable")]
    public string ReceiptFileName;


    [Required(ErrorMessage = "Serial Number Image is required.")]
    [MinLength(5, ErrorMessage = "Serial Number Empty image is not acceptable")]
    public string SerialNumberImageString;

    [Required(ErrorMessage = "Serial Number Image File Name is required.")]
    [MinLength(5, ErrorMessage = "Serial Number Image File Name is not acceptable")]
    public string SerialNumberFileName;

    public string Country;

    [Required(ErrorMessage = "Claim Reason Required.")]
    public string ClaimReason;

}