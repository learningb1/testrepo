export class registrationuploadmodel {
    SerialNumber?: string;
    PurchaseDate?: string;
    FirstName?: string;
    LastName?: string;
    DateofBirth?: string;
    EmailAddress?: string;
    AddressLine1?: string;
    AddressLine2?: string;
    City?: string;
    State?: string;
    ZipCode?: string;
    ImageString?:string;
    FileName?:string;
    Country?: string;

    constructor(
        SerialNumber?: string,
        PurchaseDate?: string,
        FirstName?: string,
        LastName?: string,
        DateofBirth?: string,
        EmailAddress?: string,
        AddressLine1?: string,
        AddressLine2?: string,
        City?: string,
        State?: string,
        ZipCode?: string,
        ImageString?:string,
        FileName?:string,
        Country?: string
    ) {
        this.SerialNumber      =SerialNumber;
        this.PurchaseDate      =PurchaseDate;
        this.FirstName	      =FirstName   ;
        this.LastName	      =LastName    ;
        this.DateofBirth	      =DateofBirth ;
        this.EmailAddress	      =EmailAddress ;
        this.AddressLine1      =AddressLine1;
        this.AddressLine2      =AddressLine2;
        this.City	      =City	   ;
        this.State	      =State	   ;
        this.ZipCode	      =ZipCode     ;
        this.ImageString	      =ImageString ;
        this.FileName	      =FileName    ;
        this.Country	      =Country     ;
        
    }

}