import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import { ToastController } from 'ionic-angular';
import { HttpHeaders } from '@angular/common/http';
import {BrandPage} from "../brand/brand";
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage";
import {TabsPage} from "../tabs/tabs";
/**
 * Generated class for the CompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company',
  templateUrl: 'company.html',
})
export class CompanyPage {
  data:any;
  companies:any;
  sponsor_silver:any;
  sponsor_golden:any;
  sponsor_participants:any;
  skeltonData = [{
    "id": 1,
    "name": "",
    "logo" : "",
    "show_url": "https://app.soexpo.net/api/companies/v1oz1Yz27j",
    "rating_url": "https://app.soexpo.net/api/companies/rate/v1oz1Yz27j",
  }];
  openBrand(url){
    if (this.loginStatus == true) {
      console.log(url);
      this.navCtrl.push(BrandPage, {url: url})
    }else {
      alert ('Login first to open this page');
    }
  }
  safeData:any;
  getItems(ev: any) {
    this.companies = this.safeData;
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.getData('search',val)
      // this.companies = this.companies.filter((item) => {
      //   return (item['name'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      // })
    }else {
      this.companies = this.safeData;
    }
  }
  lang:any;
  getData(search,query){
    if (this.loginStatus){
      if (this.loginData.confirmed) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  this.globalVar.loginData.authorization,
          'Content-Type' : 'application/json'
        })
      };
      if (search == 'search'){
        console.log(this.globalVar.apiUrl+'exhibitions/7goegqKYnQ'+'?lang='+this.lang+'&search='+query);
        this.data = this.httpClient.get(this.globalVar.apiUrl+'exhibitions/7goegqKYnQ'+'?lang='+this.lang+'&search='+query,httpOptions);
      } else {
        this.data = this.httpClient.get(this.globalVar.apiUrl+'exhibitions/7goegqKYnQ'+'?lang='+this.lang,httpOptions);
      }
      // this.data = this.httpClient.get(this.navParams.get('url')+'?lang='+this.lang,httpOptions);
      this.data
        .subscribe(data => {
          console.log(data);
          if (data.level == 'success'){
            // console.log(data.data.companies);
            this.companies = data.data.companies;
            this.safeData = data.data.companies;
            this.sponsor_silver = data.data.sponsor_silver;
            this.sponsor_golden = data.data.sponsor_golden;
            this.sponsor_participants = data.data.slider.slides;
            console.log(this.sponsor_participants);
            // console.log(this.sponsor_silver);
          }
        },error=> {
          console.log(error);
          if(error.status == 422){
            // alert(error.error.message)
          }
          // console.log(error.error.message)
        });
      }else {
        alert('please confirm your account to access');
        this.navCtrl.pop();
      }
    }else {
      alert('logged first tp access this page!');
      this.navCtrl.pop();
    }

  }
  loginStatus:any = false;
  loginData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public httpClient: HttpClient,
              public globalVar: GloaleVariablesProvider,
              public toastCtrl: ToastController,
              public translate: TranslateService,
              private storage: Storage,
  ) {
    this.lang = globalVar.lang;
    translate.setDefaultLang(this.lang);
    this.loginData = this.globalVar.loginData;
    this.loginStatus = globalVar.loginStatus;
    this.getData('noSearch','query');
    this.sponsor_silver = this.skeltonData;
    this.companies = this.skeltonData;
    this.sponsor_participants = this.skeltonData;
    this.sponsor_golden = this.skeltonData;
    // console.log(navParams.get('url'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyPage');
  }

}
