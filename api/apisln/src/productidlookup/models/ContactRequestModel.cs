using System;
using System.ComponentModel.DataAnnotations;
public class ContactRequestModel
{
   

    [Required(ErrorMessage = "Email Address is required.")]
    public string EmailAddress;

    [Required(ErrorMessage = "Name is required.")]
    public string Name;

    [Required(ErrorMessage = "Phone Number is required.")]
    public string PhoneNumber;

    [Required(ErrorMessage = "Subject is required.")]
    public string Subject;

    [Required(ErrorMessage = "Message is required.")]
    public string Message;

    [Required(ErrorMessage = "Message is required.")]
    public string RequestSource;

}