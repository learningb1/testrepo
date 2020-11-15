using System;
using System.ComponentModel.DataAnnotations;

public class RegistrationModel
{
    /*
      {
 "SerialNumber" : "",
    "PurchaseDate" : "",
    "FirstName" : "",
    "LastName" : "",
    "DateofBirth" : "",
    "EmailAddress" : "",
    "AddressLine1" : "",
    "AddressLine2" : "",
    "City" : "",
    "State" : "",
    "ZipCode" : "",
    "ImageString" : "",
    "FileName" : "",
    "Country" : ""
}
    */


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
    public string ImageString;

    [Required(ErrorMessage = "Image File Name is required.")]
    [MinLength(5, ErrorMessage = "Empty image File Name is not acceptable")]
    public string FileName;

    public string Country;

}