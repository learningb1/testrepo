import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import {ContactRequestService} from '../../shared/services/contactrequest.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.sass']
})


export class ContactComponent implements OnInit {
  csubmitbuttonloading = false;
  cshowsubmitstatus = false;
  csubmissionstatusstring = "";
  constructor(public contactrequestservice: ContactRequestService) {
    contactrequestservice.contactrequestform.patchValue({RequestSource: "Wholesalers"});

  }

  ngOnInit() {
  }

  SetCSubmittingStatus(message: string): void{

    this.csubmitbuttonloading = true;
    this.cshowsubmitstatus = true;
    this.csubmissionstatusstring = message;
      
  }
  
  SetCSubmissionSuccessStatus(message: string): void{
    this.csubmissionstatusstring = message;
      this.csubmitbuttonloading = false;
      this.cshowsubmitstatus = true;
  }
  
  
  SetCSubmissionFailureStatus(message:string): void{
    this.csubmissionstatusstring = message;
      this.csubmitbuttonloading = false;
      this.cshowsubmitstatus = true;
  }


  UploadContactQueryRequest() : void
  {

    this.contactrequestservice.contactrequestform.patchValue({RequestSource: "Wholesalers"});
    if (this.contactrequestservice.contactrequestform.invalid)
    {
        this.SetCSubmissionFailureStatus("Please the contact information entered. Some of it is invalid.")
        return;
    }

    this.SetCSubmittingStatus("Submitting your ContactRequest...");
    debugger;
    this.contactrequestservice.postcontactrequest().subscribe(
      res =>{
              let result1: string = "";
              result1 = res['result'];
              if (result1 === 'ok')
              {
                this.SetCSubmissionSuccessStatus("We have received your enquiry. Our team is reviewing it currently and respond back on finishing their review of your request.");
              }
              else
              {
                this.SetCSubmissionFailureStatus("Our apologies. We could not submit your enquiry. Please contact us by email at contact@mymyvape.com.");
              }
          
      },
      err => {
          this.SetCSubmissionFailureStatus("Our apologies. We could not submit your enquiry. Please contact us by email at contact@mymyvape.com.");
      }
    );
  }

}
