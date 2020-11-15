import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {registrationuploadmodel} from '../../../modals/registrationuploadmodel';
import {warrantyupload} from '../../../modals/warrantyupload.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProductregistrationService {

  rimgdata : string;
  rimgabspath: string;
  readonly rooturl = "https://localhost:5001/api/";
  registrationdetail : registrationuploadmodel;
  warrantydetail: warrantyupload;
  
  wreceiptimgdata : string;
  wreceiptimgabspath: string;
  wserialnumberimgdata : string;
  wserialnumberimgabspath: string;

  constructor(private httpClient: HttpClient) { }

  warrantyform: FormGroup = new FormGroup(
    {
      wserialnumber: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(6)]),
      wpurchasedate: new FormControl(''),
      wfirstname: new FormControl(''),
      wlastname: new FormControl('',[Validators.required]),
      wdateofbirth: new FormControl(''),
      wemailaddress: new FormControl('',[Validators.required,Validators.email]),
      waddressline1: new FormControl(''),
      waddressline2: new FormControl(''),
      wcity: new FormControl(''),
      wstate: new FormControl('none'),
      wzipcode: new FormControl('',[Validators.required,Validators.minLength(5)]),
      wcountry: new FormControl('none'),
      wreceiptfilepath: new FormControl(''),
      wserialnumberfilepath: new FormControl(''),
      wclaimreason: new FormControl('',[Validators.required,Validators.minLength(5)])
    }
  );

  registerform: FormGroup = new FormGroup(
    {
      rserialnumber: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(6)]),
      rpurchasedate: new FormControl(''),
      rfirstname: new FormControl(''),
      rlastname: new FormControl('',[Validators.required]),
      rdateofbirth: new FormControl(''),
      remailaddress: new FormControl('',[Validators.required,Validators.email]),
      raddressline1: new FormControl(''),
      raddressline2: new FormControl(''),
      rcity: new FormControl(''),
      rstate: new FormControl('none'),
      rzipcode: new FormControl('',[Validators.required,Validators.minLength(5)]),
      rcountry: new FormControl('none'),
      rfilepath: new FormControl(''),
    }

  );

  postregistrationdetail()
  {
    this.registrationdetail = new registrationuploadmodel(
     this.registerform.controls.rserialnumber.value,
     this.registerform.controls.rpurchasedate.value.toLocaleString(),
     this.registerform.controls.rfirstname.value,
     this.registerform.controls.rlastname.value,
     this.registerform.controls.rdateofbirth.value.toLocaleString(),
     this.registerform.controls.remailaddress.value,
     this.registerform.controls.raddressline1.value,
     this.registerform.controls.raddressline2.value,
     this.registerform.controls.rcity.value,
     this.registerform.controls.rstate.value,
     this.registerform.controls.rzipcode.value,
     this.rimgdata,
     this.registerform.controls.rfilepath.value,
     this.registerform.controls.rcountry.value);
    
      return this.httpClient.post( this.rooturl + 'RegistrationUpload', this.registrationdetail);
  }

  postwarrantydetail()
  {
    this.warrantydetail = new warrantyupload(
     this.warrantyform.controls.wserialnumber.value,
     this.warrantyform.controls.wpurchasedate.value.toLocaleString(),
     this.warrantyform.controls.wfirstname.value,
     this.warrantyform.controls.wlastname.value,
     this.warrantyform.controls.wdateofbirth.value.toLocaleString(),
     this.warrantyform.controls.wemailaddress.value,
     this.warrantyform.controls.waddressline1.value,
     this.warrantyform.controls.waddressline2.value,
     this.warrantyform.controls.wcity.value,
     this.warrantyform.controls.wstate.value,
     this.warrantyform.controls.wzipcode.value,
     this.wreceiptimgdata,
     this.warrantyform.controls.wreceiptfilepath.value,
     this.wreceiptimgdata,
     this.warrantyform.controls.wserialnumberfilepath.value,
     this.warrantyform.controls.wcountry.value,
     this.warrantyform.controls.wclaimreason.value,);
    
      return this.httpClient.post( this.rooturl + 'WarrantyUpload', this.warrantydetail);
  }


  
}
