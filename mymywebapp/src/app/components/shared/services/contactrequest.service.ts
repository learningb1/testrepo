import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {contactrequest} from '../../../modals/contactrequest.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ContactRequestService {

  readonly rooturl = "https://mymyvape.azurewebsites.net/api/";
  //readonly rooturl = "https://localhost:5001/api/";
  contactrequestdetail : contactrequest;
  
  constructor(private httpClient: HttpClient) { }

  contactrequestform: FormGroup = new FormGroup(
    {
      Name: new FormControl('',[Validators.required,Validators.minLength(3)]),
      EmailAddress: new FormControl('',[Validators.required,Validators.email]),
      PhoneNumber: new FormControl('',Validators.required),
      Subject: new FormControl('',Validators.required),
      Message: new FormControl('',Validators.required),
      RequestSource: new FormControl('',Validators.required)
    }
  );

  postcontactrequest()
  {
    this.contactrequestdetail = new contactrequest(
     this.contactrequestform.controls.Name.value,
     this.contactrequestform.controls.EmailAddress.value,
     this.contactrequestform.controls.PhoneNumber.value,
     this.contactrequestform.controls.Subject.value,
     this.contactrequestform.controls.Message.value,
     "Contact");
    
      return this.httpClient.post( this.rooturl + 'ContactRequest', this.contactrequestdetail);
  }

  postwholesalerrequest()
  {
    this.contactrequestdetail = new contactrequest(
     this.contactrequestform.controls.Name.value,
     this.contactrequestform.controls.EmailAddress.value,
     this.contactrequestform.controls.PhoneNumber.value,
     this.contactrequestform.controls.Subject.value,
     this.contactrequestform.controls.Message.value,
     "Wholesalers");
    
      return this.httpClient.post( this.rooturl + 'ContactRequest', this.contactrequestdetail);
  }

}
