using System;
using System.ComponentModel.DataAnnotations;

public class ACHPaymentUploadModel
{
   
    [Required(ErrorMessage = "Bank Name is required.")]
    public string BankName;

    [Required(ErrorMessage = "Company Name is required.")]
    public string CompanyName;

    [Required(ErrorMessage = "Contact Name is required.")]
    public string ContactName;

    [Required(ErrorMessage = "Account Type is required.")]
    public string AccountType;
    
    [Required(ErrorMessage = "Bank Account Number is required.")]
    public string  BankAccountNumber;

    [Required(ErrorMessage = "Bank Routing Number is required.")]
    public string BankRoutingNumber;

    [Required(ErrorMessage = "Bank Routing Number is required.")]
    public string BankRoutingVerified;


    [Required(ErrorMessage = "Email Address is required.")]
    [RegularExpression(@"^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$", ErrorMessage = "Email is not valid.")]  
    public string	EmailAddress;
    
    [Required(ErrorMessage = "Address Line 1 is required.")]
    public string AddressLine1;

     [Required(ErrorMessage = "Address Line 2 is required.")]
    public string AddressLine2;

    [Required(ErrorMessage = "City is required.")]
    public string City;
    
    [Required(ErrorMessage = "State is required.")]
    public string State;

    [Required(ErrorMessage = "Printed Name is required.")]
    public string PrintedName;

    [Required(ErrorMessage = "Title Name is required.")]
    public string TitleName;

    [Required(ErrorMessage = "FEIN is required.")]
    public string FEIN;

    [Required(ErrorMessage = "Date Signed is required.")]
    public string datesigned;
    

    [Required(ErrorMessage = "ZipCode is required.")]
    [MinLength(5, ErrorMessage = "Zipcode cannot be less than 5 characters.")]

    public string ZipCode;

    [Required(ErrorMessage = "Image is required.")]
    [MinLength(5, ErrorMessage = "Empty image is not acceptable")]
    public string VoidCheckImageString;

    [Required(ErrorMessage = "Void Check Image File Name is required.")]
    [MinLength(5, ErrorMessage = "Void Check image File Name is not acceptable")]
    public string VoidCheckFileName;

    public string CommentsOrMessage;

    [Required(ErrorMessage = "Source is required.")]
    public string Source;

}