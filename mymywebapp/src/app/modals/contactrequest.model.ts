export class contactrequest {
    Name?: string;
    EmailAddress?: string;
    PhoneNumber?: string;
    Subject?: string;
    Message?: string;
    RequestSource?:string;


    constructor(
        Name?: string,
    EmailAddress?: string,
    PhoneNumber?: string,
    Subject?: string,
    Message?: string,
    RequestSource?:string
    
    ) {
        this.EmailAddress	      =EmailAddress ;
        this.Message = Message;
        this.Name = Name;
        this.PhoneNumber = PhoneNumber;
        this.RequestSource = RequestSource;
        this.Subject = Subject;
    }

}