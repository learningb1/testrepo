import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {ProductIdLookupResults} from './productidlookupresult';

@Injectable({
  providedIn: 'root'
})
export class MymyapiService {
  private pidLkUpResult: ProductIdLookupResults; 
  private productId: string;
  constructor(private http: HttpClient) {

   }

  
   public getProductIdLookupAsync(callBackProductIdLookUp: Function, productId: string): void
   {
    this.productId = productId;
      this.http.get<ProductIdLookupResults>("http://mymyvape.azurewebsites.net/api/ProductIdValidation/" + productId).toPromise().then(data=>{
        this.pidLkUpResult = data;
        callBackProductIdLookUp(this.pidLkUpResult,  this.productId);
      }
      );
   }

  
   
}
