import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import {ContactRequestService} from '../../shared/services/contactrequest.service';
@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.sass']
})
export class FaqComponent implements OnInit {

  fsubmitbuttonloading = false;
  fshowsubmitstatus = false;
  fsubmissionstatusstring = "";

  constructor(public contactrequestservice: ContactRequestService) {
    contactrequestservice.contactrequestform.patchValue({RequestSource: "ContactQuery"});

  }

  ngOnInit() {
  }

  SetFSubmittingStatus(message: string): void{

    this.fsubmitbuttonloading = true;
    this.fshowsubmitstatus = true;
    this.fsubmissionstatusstring = message;
      
  }
  
  SetFSubmissionSuccessStatus(message: string): void{
    this.fsubmissionstatusstring = message;
      this.fsubmitbuttonloading = false;
      this.fshowsubmitstatus = true;
  }
  
  
  SetFSubmissionFailureStatus(message:string): void{
    this.fsubmissionstatusstring = message;
      this.fsubmitbuttonloading = false;
      this.fshowsubmitstatus = true;
  }


  UploadContactQueryRequest() : void
  {
    if (this.contactrequestservice.contactrequestform.invalid)
    {
        this.SetFSubmissionFailureStatus("Please the contact information entered. Some of it is invalid.")
        return;
    }

    this.SetFSubmittingStatus("Submitting your ContactRequest...");
    debugger;
    this.contactrequestservice.postcontactrequest().subscribe(
      res =>{
              let result1: string = "";
              result1 = res['result'];
              if (result1 === 'ok')
              {
                this.SetFSubmissionSuccessStatus("We have received your enquiry. Our team is reviewing it currently and respond back on finishing their review of your request.");
              }
              else
              {
                this.SetFSubmissionFailureStatus("Our apologies. We could not submit your enquiry. Please contact us by email at contact@mymyvape.com.");
              }
          
      },
      err => {
          this.SetFSubmissionFailureStatus("Our apologies. We could not submit your enquiry. Please contact us by email at contact@mymyvape.com.");
      }
    );
  }


}
