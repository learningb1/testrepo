import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import { Validators, FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import {WholesalerService} from '../../shared/services/wholesaler.service';
import {WholesalerRegistration, StateRegistration} from '../../../modals/wholesalerregistration.model';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';

@Component({
  selector: 'app-wholesalers',
  templateUrl: './wholesalers.component.html',
  styleUrls: ['./wholesalers.component.sass']
})
export class WholesalersComponent implements OnInit {
  whcsubmitbuttonloading = false;
  whcshowsubmitstatus = false;
  whcsubmissionstatusstring = "";

  public wholesalerform: FormGroup;

  constructor(private _fb: FormBuilder, private wholesalerservice: WholesalerService) {
      

  }

  ngOnInit() {

    this.wholesalerform = this._fb.group({
      BusinessName: new FormControl('',[Validators.required,Validators.minLength(3)]),
      AddressLine1: new FormControl('',[Validators.required,Validators.minLength(3)]),
      AddressLine2: new FormControl('',[Validators.minLength(3)]),
      City: new FormControl('',[Validators.required]),
      State: new FormControl('',[Validators.required]),
      ZipCode: new FormControl('',[Validators.required]),
      BusinessPhoneNumber: new FormControl('',[Validators.required]),
      EmailAddress: new FormControl('',[Validators.required,Validators.email]),
      ContactName: new FormControl('',[Validators.required]),
      FederalBusinessTaxId: new FormControl('',[Validators.required,Validators.minLength(9),Validators.maxLength(9)]),
      StateRegistrations: this._fb.array([this.initstateregistrations(),]),
      Subject: new FormControl('',[Validators.required]),
      Message: new FormControl('',[Validators.required])
      
  });
  }

  initstateregistrations()
  {
      return this._fb.group({
        StateSalesTaxId: new FormControl('',Validators.required),
        StateSelected: new FormControl('',Validators.required),  
        FileName: new FormControl('',Validators.required),
        ImgFileData: new FormControl('',Validators.required),
      });
  }

  _handleReaderLoaded(i: number, readerEvt ) {

    var binaryString = readerEvt.target.result;
    let arr: FormArray = this.wholesalerform.get('StateRegistrations') as FormArray;
    let arrval: FormControl = arr.controls[i] as FormControl;
    arrval.patchValue({ImgFileData: btoa(binaryString)});
    }

  uploadFileEvt(imgFile: any,i: number) {
    
    if (imgFile.target.files && imgFile.target.files[0]) {

        let arr: FormArray = this.wholesalerform.get('StateRegistrations') as FormArray;
        let arrval: FormControl = arr.controls[i] as FormControl;
        arrval.patchValue({FileName: ""});
        
      Array.from(imgFile.target.files).forEach((file: File) => {
        arrval.patchValue({FileName: file.name});
        
        var reader = new FileReader();
        reader.onload = this._handleReaderLoaded.bind(this,i);
        reader.readAsBinaryString(imgFile.target.files[0]);
         });
    }

  }



  addstateregistrations()
  {
    // add address to the list
    const control = <FormArray>this.wholesalerform.controls['StateRegistrations'];
    control.push(this.initstateregistrations());
  }

  removeregistrations(i: number)
  {
      if (i>0)
      {
        const control = <FormArray>this.wholesalerform.controls['StateRegistrations'];
        control.removeAt(i);
      }
  }

  SetWHCSubmittingStatus(message: string): void{

    this.whcsubmitbuttonloading = true;
    this.whcshowsubmitstatus = true;
    this.whcsubmissionstatusstring = message;
      
  }
  
  SetWHCSubmissionSuccessStatus(message: string): void{
    this.whcsubmissionstatusstring = message;
      this.whcsubmitbuttonloading = false;
      this.whcshowsubmitstatus = true;
  }
  
  
  SetWHCSubmissionFailureStatus(message:string): void{
    this.whcsubmissionstatusstring = message;
      this.whcsubmitbuttonloading = false;
      this.whcshowsubmitstatus = true;
  }


  UploadWholesalerQueryRequest(modelform: FormGroup) : void
  {

    console.log(modelform.value);
    debugger;
    if (this.wholesalerform.invalid)
    {
        this.SetWHCSubmissionFailureStatus("Please check the query information entered. Some of it is invalid.")
        return;
    }

    this.SetWHCSubmittingStatus("Submitting your Wholesaler Request...");
    
    this.wholesalerservice.postwholesalerquerydetail(modelform.value).subscribe(
      res =>{
              let result1: string = "";
              result1 = res['result'];
              if (result1 === 'ok')
              {
                this.SetWHCSubmissionSuccessStatus("We have received your enquiry. Our team is reviewing it currently and respond back on finishing their review of your request.");
              }
              else
              {
                this.SetWHCSubmissionFailureStatus("Our apologies. We could not submit your enquiry. Please contact us by email at contact@mymyvape.com.");
              }
          
      },
      err => {
          this.SetWHCSubmissionFailureStatus("Our apologies. We could not submit your enquiry. Please contact us by email at contact@mymyvape.com.");
      }
    );
  }

  wcstates = 
  [
    {
        "name": "Alabama",
        "code": "AL"
    },
    {
        "name": "Alaska",
        "code": "AK"
    },
    {
        "name": "American Samoa",
        "code": "AS"
    },
    {
        "name": "Arizona",
        "code": "AZ"
    },
    {
        "name": "Arkansas",
        "code": "AR"
    },
    {
        "name": "California",
        "code": "CA"
    },
    {
        "name": "Colorado",
        "code": "CO"
    },
    {
        "name": "Connecticut",
        "code": "CT"
    },
    {
        "name": "Delaware",
        "code": "DE"
    },
    {
        "name": "District Of Columbia",
        "code": "DC"
    },
    {
        "name": "Federated States Of Micronesia",
        "code": "FM"
    },
    {
        "name": "Florida",
        "code": "FL"
    },
    {
        "name": "Georgia",
        "code": "GA"
    },
    {
        "name": "Guam",
        "code": "GU"
    },
    {
        "name": "Hawaii",
        "code": "HI"
    },
    {
        "name": "Idaho",
        "code": "ID"
    },
    {
        "name": "Illinois",
        "code": "IL"
    },
    {
        "name": "Indiana",
        "code": "IN"
    },
    {
        "name": "Iowa",
        "code": "IA"
    },
    {
        "name": "Kansas",
        "code": "KS"
    },
    {
        "name": "Kentucky",
        "code": "KY"
    },
    {
        "name": "Louisiana",
        "code": "LA"
    },
    {
        "name": "Maine",
        "code": "ME"
    },
    {
        "name": "Marshall Islands",
        "code": "MH"
    },
    {
        "name": "Maryland",
        "code": "MD"
    },
    {
        "name": "Massachusetts",
        "code": "MA"
    },
    {
        "name": "Michigan",
        "code": "MI"
    },
    {
        "name": "Minnesota",
        "code": "MN"
    },
    {
        "name": "Mississippi",
        "code": "MS"
    },
    {
        "name": "Missouri",
        "code": "MO"
    },
    {
        "name": "Montana",
        "code": "MT"
    },
    {
        "name": "Nebraska",
        "code": "NE"
    },
    {
        "name": "Nevada",
        "code": "NV"
    },
    {
        "name": "New Hampshire",
        "code": "NH"
    },
    {
        "name": "New Jersey",
        "code": "NJ"
    },
    {
        "name": "New Mexico",
        "code": "NM"
    },
    {
        "name": "New York",
        "code": "NY"
    },
    {
        "name": "North Carolina",
        "code": "NC"
    },
    {
        "name": "North Dakota",
        "code": "ND"
    },
    {
        "name": "Northern Mariana Islands",
        "code": "MP"
    },
    {
        "name": "Ohio",
        "code": "OH"
    },
    {
        "name": "Oklahoma",
        "code": "OK"
    },
    {
        "name": "Oregon",
        "code": "OR"
    },
    {
        "name": "Palau",
        "code": "PW"
    },
    {
        "name": "Pennsylvania",
        "code": "PA"
    },
    {
        "name": "Puerto Rico",
        "code": "PR"
    },
    {
        "name": "Rhode Island",
        "code": "RI"
    },
    {
        "name": "South Carolina",
        "code": "SC"
    },
    {
        "name": "South Dakota",
        "code": "SD"
    },
    {
        "name": "Tennessee",
        "code": "TN"
    },
    {
        "name": "Texas",
        "code": "TX"
    },
    {
        "name": "Utah",
        "code": "UT"
    },
    {
        "name": "Vermont",
        "code": "VT"
    },
    {
        "name": "Virgin Islands",
        "code": "VI"
    },
    {
        "name": "Virginia",
        "code": "VA"
    },
    {
        "name": "Washington",
        "code": "WA"
    },
    {
        "name": "West Virginia",
        "code": "WV"
    },
    {
        "name": "Wisconsin",
        "code": "WI"
    },
    {
        "name": "Wyoming",
        "code": "WY"
    },
    {
      "name": "None",
      "code": "None"
  }

]

}
