import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/modals/product.model';
import { CartItem } from 'src/app/modals/cart-item';
import { CartService } from '../services/cart.service';
import { SidebarMenuService } from '../sidebar/sidebar-menu.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { FormsModule } from '@angular/forms';
import {MymyapiService} from '../../../mymyapi.service';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {ProductIdLookupResults} from '../../../productidlookupresult';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  public sidenavMenuItems:Array<any>;

  public currencies = ['USD'];
  public currency:any;
  public flags = [
    { name:'United States', image: 'assets/images/flags/us.png' }
  ]
  public flag:any;
  public inputVar: string;

  products: Product[];

  productidstatus: string;

  private getprod;


  indexProduct: number;
  shoppingCartItems: CartItem[] = [];
  public pid : ProductIdLookupResults;

  constructor(private cartService: CartService, public mymyapiService: MymyapiService) {
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    let productidstatus = "Enter Product Serial Number..."
  }

  ngOnInit() {
    this.currency = this.currencies[0];
    this.flag = this.flags[0];
    
  
  }

  public changeCurrency(currency){
    this.currency = currency;
  }
  public changeLang(flag){
    this.flag = flag;
  }
  
  public validateProductId()
  {
    
    let pidval: string = this.inputVar;

    this.inputVar = "Checking ...";
    
    this.mymyapiService.getProductIdLookupAsync(this.callBackProductIdLookUp, pidval);

  }

  private callBackProductIdLookUp(p: ProductIdLookupResults,prdidval: string ) : void 
  {
    let pid = p;

    if (pid.result === "ok")
    {
      alert(prdidval + " is a valid product serial number");
    }
    else
    {
      alert(prdidval + " is not a valid product serial number"); 
    }
  }

  public validateProductIdNew()
  {

    let pid: string = "";

    pid = this.productidstatus;
        
    this.productidstatus = "Checking ...";
    
    this.mymyapiService.getProductIdLookupNew(pid).subscribe(
      res =>{
              let result1: string = "";
              result1 = res['result'];
              if (result1 === 'ok')
              {
                this.productidstatus = "Valid Serial Number";  
              }
              else
              {
                this.productidstatus = "Invalid Serial Number";
              }
          
      },
      err => {
        this.productidstatus = "Invalid Serial Number";
      }
    );

  }

  
}
