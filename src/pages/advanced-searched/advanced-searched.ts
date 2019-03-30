import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import {TranslateService} from "@ngx-translate/core";
import { HttpHeaders } from '@angular/common/http';
import {BrandPage} from "../brand/brand";
import {ProDetailPage} from "../pro-detail/pro-detail";
import {Storage} from "@ionic/storage";
/**
 * Generated class for the AdvancedSearchedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-advanced-searched',
  templateUrl: 'advanced-searched.html',
})
export class AdvancedSearchedPage {
  exhibition:any = '';
  data:any;
  data2:any;
  data3:any;
  data4:any;
  exhibitions:any = [];
  city:any = '';
  cities:any = [];
  citiesData:any = [];
  country:any;
  countryData:any = [];
  cities2:any = '';
  keyword:any = '';
  companies:any = [];
  cart: any = [];
  search(){
    console.log(this.keyword);
    console.log(this.city);
    console.log(this.country);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        // 'X-Requested-With' : 'XMLHttpRequest',
        'Authorization' : this.globalVar.loginData.authorization
      })
    };
    this.data4 = this.httpClient.get(this.globalVar.apiUrl+'models-advanced-search?city_id='+this.city+'&exhibition_id='+this.exhibition+'&search='+this.keyword+'&lang='+this.globalVar.lang,httpOptions);
    // this.data = httpClient.get('https://app.soexpo.net/api/get-countries-list');
    // console.log(this.globalVar.apiUrl+'models-advanced-search?city_id='+this.city+'&exhibition_id='+this.exhibition+'&search='+this.keyword+'&lang='+this.globalVar.lang);
    this.data4
      .subscribe(data => {
        console.log(data);
        if (data.level == 'success'){
          this.companies = data.data.data;
        }
      },error=> {
        console.log(error);
        if(error.status == 422){
          alert(error.error.message)
        }
      });
  }
  openBrand(url){
    if (this.globalVar.loginStatus) {
      console.log(url);
      if(this.globalVar.loginData.confirmed){
        this.navCtrl.push(BrandPage, {url: url})
      }else {
        alert('Activate your account first')
      }
    }else {
      alert ('Login first to open this page');
    }
  }
  cityChange(){
    console.log(this.country);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        // 'X-Requested-With' : 'XMLHttpRequest'
      })
    };
    this.data3 = this.httpClient.get(this.globalVar.apiUrl+'get-country-cities/'+this.country+'?lang='+this.globalVar.lang,httpOptions);
    // this.data = httpClient.get('https://app.soexpo.net/api/get-countries-list');
    this.data3
      .subscribe(data => {
        console.log(data);
        if (data.level == 'success'){
          console.log(this.cities);
          let user = {
            role:"administrator",
            status:10,
            tries:2,
          };
          this.cities2 = data.data;
          let arr = {};
          this.citiesData = [];
          for(let key in this.cities2){
            if(this.cities2.hasOwnProperty(key)){
              console.log(key);
              arr = {id:key,city:this.cities2[key]};
              // this.citiesData.push(this.cities[key]);
              this.citiesData.push(arr);
            }
          }
          console.log(this.citiesData);

          // this.addExhibition();
        }
      },error=> {
        console.log(error);
        if(error.status == 422){
          alert(error.error.message)
        }
      });
  }
  oepnProDetail(url){
    console.log('111');
    this.navCtrl.push(ProDetailPage,{url:url});
  }
  addToCartCheck(id){
    if((this.cart.find(e => e.brand_id === id))){
      return false
    }
    else {
      return true
    }
  }
  addToCart(id,image,url,company_id){
    this.cart.push( {
      company_id: company_id,
      brand_id: id,
      quantity: 1,
      image: image,
      show_url: url
    });
    console.log(this.cart);

    this.storage.set("cart", this.cart);
    this.events.publish('cart:updated',this.cart.length);
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpClient: HttpClient,
              public globalVar: GloaleVariablesProvider,
              public translate: TranslateService,private storage: Storage,public events: Events
  ) {
    this.storage.get('cart').then((data)=>{
      if (data != null) {
        console.log(data);
        this.cart = data;
        console.log('cart+++' + this.cart)
      }
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        // 'X-Requested-With' : 'XMLHttpRequest'
      })
    };
    this.data = httpClient.get(globalVar.apiUrl+'get-exhibitions-list?lang='+this.globalVar.lang,httpOptions);
    // this.data = httpClient.get('https://app.soexpo.net/api/get-countries-list');
    this.data
      .subscribe(data => {
        console.log(data);
        if (data.level == 'success'){
          // this.registerData.email = 'hello@gmail.com';
          this.exhibitions = data.data.exhibitions;
          console.log(this.exhibitions);
          // this.addExhibition();
        }
      },error=> {
        console.log(error);
        if(error.status == 422){
          alert(error.error.message)
        }
      });
    this.country = 'SA';
    this.cityChange();
    console.log(1);
    this.keyword = 'شركة سعيد';
    this.search();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdvancedSearchedPage');
  }

}
