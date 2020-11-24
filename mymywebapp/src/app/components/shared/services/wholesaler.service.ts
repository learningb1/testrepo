import { Injectable } from '@angular/core';
import {WholesalerRegistration} from '../../../modals/wholesalerregistration.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class WholesalerService {

  //readonly rooturl = "https://localhost:5001/api/";
  readonly rooturl = "https://mymyvape.azurewebsites.net/api/";
  

  constructor(private httpClient: HttpClient) { }

  postwholesalerquerydetail(model: WholesalerRegistration)
  {
    return this.httpClient.post( this.rooturl + 'WholesalersRequest', model);
  }

}
