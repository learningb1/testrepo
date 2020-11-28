export interface WholesalerRegistration
{
    BusinessName: string;
    AddressLine1: string;
    AddressLine2: string;
    City: string;
    State: string;
    ZipCode: string;
    BusinessPhoneNumber: string;
    EmailAddress: string;
    ContactName: string;
    FederalBusinessTaxId: string;
    StateRegistrations : StateRegistration[];
    Subject: string;
    Message: string;
    FEINImageString: string;
    FEINFileName: string;




}

export interface StateRegistration
{
    StateSalesTaxId: string;
    StateSelected: string;
    FileName: string;
    ImgFileData: string;
}