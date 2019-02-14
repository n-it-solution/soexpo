import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {BrandPage} from "../brand/brand";
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import {TabsPage} from "../tabs/tabs";
import { HttpHeaders } from '@angular/common/http';
import {CompanyPage} from "../company/company";

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
        'Authorization':  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjEyYjMwNjIyMzgzNGZhNzUzYzZlMWVlMDM5ZGQ2NmE0NDIxYjI5YTM1Yzg0MmMxMjA5OWZhZDIyYTA2NDYwZTkxZmJkOTI4NzRhNjA3ZDE4In0.eyJhdWQiOiIxIiwianRpIjoiMTJiMzA2MjIzODM0ZmE3NTNjNmUxZWUwMzlkZDY2YTQ0MjFiMjlhMzVjODQyYzEyMDk5ZmFkMjJhMDY0NjBlOTFmYmQ5Mjg3NGE2MDdkMTgiLCJpYXQiOjE1NTAxMzY3MzAsIm5iZiI6MTU1MDEzNjczMCwiZXhwIjoxNTgxNjcyNzMwLCJzdWIiOiIyMDMiLCJzY29wZXMiOltdfQ.CEjDbjf4A9lTKOHb3oyeZ_7WdoZtY97ERFN1Gp7aFf-sOgZaoklSIutk1UUL-A1_LezL--u2WMvfqXB5M8ad5g_ysEHkO2DfiPIJgPt8_Ey20K00_A72edtwCRPHLpDamuVadSdsZBg7QwxOL8rmO9P-hvODkBcLH5_eRAuu851CNBeH0d6fB8rGCEEe_tydDNN-V1ykzqg5---bRgEd8ir6cO67DTW8albLdNtHt7vldsdlzE0Kc--3EchnicVCbLLHkBiMn6dN-t_J1SMBroU5BzJO5eizTDdtPCOPVf6XwOZSPr7zvxLrMw22de7pyWXXvwCNn-VmG1yavoKLu8tKN3aRKkVN1WEYlsNx80hyY-LrNHghQ5gpnbFrI5DewIYrjuNsFFDS_zG1C-jB2tXNMSN_bXnu1YZd0Ll-rResR73ePJdO-V9XH0VmluDDeb9UBb-VJbhe19irTJF_j8PX3zS9MDA59WpDOHddn_eVVo2ECKQf0z1A4yZLVHJafxYfJcMF2VxAMLJLMi4cu8naCcqiyBO9IoksWtheGPIqHecvEjSQSXYkgLdm9Znt1tdkepXL-cslyjr2mUmwGluEFuFOHcqiy7F7pQrajd8BLSLaZ9i2rF1_vqv97pysedzlZskp2-T42l7OCLHarRmgIsooiWNGHqW_DrlBXwY',
        'Content-Type' : 'application/json'
      })
    };
    this.data = this.httpClient.post(this.globalvar.apiUrl+'send-cart?lang=en',this.cartData,httpOptions);
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
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private storage: Storage,
              public httpClient: HttpClient,
              public globalvar: GloaleVariablesProvider,
  ) {
    navCtrl.push(BrandPage);
    console.log(1);
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
