import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {Product} from "../../modals/product.model";
import {CartItem} from "../../modals/cart-item";
import {ProductService} from "../shared/services/product.service";
import {CartService} from "../shared/services/cart.service";
import { Router, NavigationEnd } from '@angular/router';
import { SidebarMenuService } from '../shared/sidebar/sidebar-menu.service';
import { SidenavMenu } from '../shared/sidebar/sidebar-menu.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  public sidenavMenuItems:Array<any>;

  public currencies = ['USD'];
  public currency:any;
  public flags = [
    { name:'United States', image: 'assets/images/flags/us.png' }]
  public flag:any;

  products: Product[];

  indexProduct: number;
  shoppingCartItems: CartItem[] = [];

  public banners = [];

  wishlistItems  :   Product[] = [];

  public url : any;

  navItems: SidenavMenu[] = [
    {
      displayName: 'Home',
      iconName: 'recent_actors',
      route: '/home/one'
    }, 
    {
      displayName: 'Products',
          iconName: 'feedback',
          route: '/home/products/all'
    },
    {
      displayName: 'Pages',
      iconName: 'report_problem',
      children: [
        {
          displayName: 'About Us',
          iconName: 'group',
          route: '/pages/about'
        },
        {
          displayName: 'FAQ',
          iconName: 'speaker_notes',
          route: '/pages/faq',
        },
        {
          displayName: 'Contact',
          iconName: 'feedback',
          route: '/pages/contact'
        }
      ]
    },
    {
      displayName: 'Contact',
          iconName: 'feedback',
          route: '/pages/contact'
    }
  ];

  constructor(public router: Router, private cartService: CartService, public sidenavMenuService:SidebarMenuService) {
    this.cartService.getItems().subscribe(shoppingCartItems => this.shoppingCartItems = shoppingCartItems);
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.url = event.url;
      }
    } )
  }

  ngAfterViewInit() {
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
}
