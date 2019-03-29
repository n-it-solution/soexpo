import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {BrandPage} from "../brand/brand";
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import {TabsPage} from "../tabs/tabs";
import { HttpHeaders } from '@angular/common/http';
import {CompanyPage} from "../company/company";
import {UpdateProfilePage} from "../update-profile/update-profile";
import {ProDetailPage} from "../pro-detail/pro-detail";
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  cart:any;
  addQuantity(index){
    let quantity = this.cart[index].quantity;
    this.cart[index].quantity = quantity+1;
    this.storage.set("cart", this.cart);
  }
  minusQuantity(index){
    let quantity = this.cart[index].quantity;
    if (quantity > 1) {
      this.cart[index].quantity = quantity-1
    }
    this.storage.set("cart", this.cart);
  }
  removeFromCart(id){
    let index = this.cart.findIndex(e => e.brand_id === id);
    this.cart.splice(index, 1);
    console.log(this.cart);
    this.storage.set("cart", this.cart);
    this.events.publish('cart:updated',this.cart.length);
  }
  cartData:any = {
    "items": [
      {
        "brands": [
          {
            "company_id": "20",
            "brand_id": "42",
            "quantity": "1",
            "pic": "cccccc"
          },
          {
            "company_id": "20",
            "brand_id": "43",
            "quantity": "1",
            "pic": "cccccc"
          }
        ]
      }
    ]
  };
  data:any;
  submitCart(){
    this.cartData.items[0].brands = this.cart;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  this.globalvar.loginData.authorization,
        'Content-Type' : 'application/json'
      })
    };
    this.data = this.httpClient.post(this.globalvar.apiUrl+'send-cart?lang='+this.globalvar.lang,this.cartData,httpOptions);
    this.data
      .subscribe(data => {
        console.log(data);
        if (data.level == 'success'){
          console.log(data.data);
          this.cart = [];
          this.storage.set("cart", this.cart);
          alert(data.message);
        }
        console.log(1);
      },error=> {
        console.log(error);
        if(error.status == 422){
          alert(error.error.message)
        }
        console.log(error.error.message)
      });
  }
  oepnProDetail(url){
    console.log('111');
    this.navCtrl.push(ProDetailPage,{url:url});
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage: Storage,
              public httpClient: HttpClient,
              public globalvar: GloaleVariablesProvider,
              public events: Events,
              public translate: TranslateService
  ) {
    translate.setDefaultLang(globalvar.lang);
    this.storage.get('cart').then((data)=>{
      if (data != null) {
        console.log(data);
        this.cart = data;
      }else {
        alert('No data in cart');
      }

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

}
