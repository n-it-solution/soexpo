import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {ExhibitionPage} from "../exhibition/exhibition";
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {RegisterPage} from "../register/register";
import {CompanyPage} from "../company/company";
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import {BrandPage} from "../brand/brand";
import {TabsPage} from "../tabs/tabs";
import {TranslateService} from "@ngx-translate/core";
import {Storage} from '@ionic/storage';
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  data:any;
  loginData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public httpClient: HttpClient,
              public globalVar: GloaleVariablesProvider,
              public translate: TranslateService,
              private storage: Storage,public events: Events
  ) {
    this.storage.get('language').then((data)=>{
      if (data != null) {
        translate.setDefaultLang(data);
        globalVar.lang = data;
      }else {
        this.storage.set('language','ar');
        translate.setDefaultLang('ar');
        globalVar.lang = 'ar';
      }
    });
    this.storage.get('loginData').then((data)=>{
      if (data != null) {
        this.events.publish('user:logged',data);
        console.log(data);
        this.loginData = data;
        this.globalVar.loginStatus = true;
        this.globalVar.loginData = data;
        navCtrl.setRoot(TabsPage);
      }
    });
      console.log(globalVar.apiUrl);
      const httpOptions = {
          headers: new HttpHeaders({
              'Access-Control-Allow-Origin':  '*',
              'Access-Control-Allow-Methods':  'POST, GET, OPTIONS, PUT',
              'Accept':  'application/json',
              'Content-Length':  '0',
              'Content-Type':  'application/x-www-form-urlencoded',
              // 'X-Requested-With': 'XMLHttpRequest'
          })
      };

    // navCtrl.push(BrandPage);
      console.log('in welcome page');
      console.log('in welcome page1');
      console.log(httpOptions);
      let data = {email:'mirza.amanan@gmail.com' , password: '0300421077'};
      let data2 = JSON.stringify({
          email: 'mirza.amanan@gmail.com',
          password: 'h'
      });
      console.log(data2);
      // this.data = httpClient.post('https://app.soexpo.net/api/auth/login?lang=en',data);
      // // this.data = httpClient.get('https://app.soexpo.net/api/get-countries-list');
      // this.data
      //     .subscribe(data => {
      //         console.log(data);
      //         if (data.level == 'success'){
      //             console.log(data.data)
      //         }
      //     },error=> {
      //         console.log(error);
      //         if(error.status == 422){
      //             alert(error.error.message)
      //         }
      //         console.log(error.error.message)
      //     });
  }
    openLogin(){
      this.navCtrl.push(LoginPage);
    }
    openRegister(){
      this.navCtrl.push(RegisterPage);
    }
    openExhibition(){
      this.navCtrl.setRoot(TabsPage);
      // this.navCtrl.push(ExhibitionPage);
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
