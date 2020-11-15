export class warrantyupload {
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
    ReceiptImageString?:string;
    ReceiptFileName?:string;
    SerialNumberImageString?:string;
    SerialNumberFileName?:string;
    Country?: string;
    ClaimReason?: string;

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
        ReceiptImageString?:string,
        ReceiptFileName?:string,
        SerialNumberImageString?:string,
        SerialNumberFileName?:string,
        Country?: string,
        ClaimReason?: string 
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
        this.ReceiptImageString  = ReceiptImageString;
        this.ReceiptFileName = ReceiptFileName;
        this.SerialNumberImageString = SerialNumberImageString;
        this.SerialNumberFileName = SerialNumberFileName;
        this.Country	      =Country     ;
        this.ClaimReason = ClaimReason;
        
    }

}