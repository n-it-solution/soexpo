import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import { ToastController } from 'ionic-angular';
import { HttpHeaders } from '@angular/common/http';
import {UpdateProfilePage} from "../update-profile/update-profile";
import {TranslateService} from "@ngx-translate/core";
import {PasswordChangePage} from "../password-change/password-change";
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  data:any;
  profile:any = {
    "id": 203,
    "name": "",
    "email": "",
    "confirmed": true,
    "roles": [
      "End User"
    ],
    "phone": "",
    "exhibitions": [
      "Building /Construction & Real Estate",
      "Food and Beverage",
      "Furniture"
    ],
    "about": null,
    "country_code": "",
    "city": "-",
    "job_title": null,
    "picture": "",
    "picture_thumb": "",
    "created_at": "02 Feb, 2019",
    "updated_at": "12 Feb, 2019",
    "authorization": "",
    "expires_at": ""
  };
  exhibition:any = [];
  openEditPage(){
    this.navCtrl.push(UpdateProfilePage);
  }
  openPassChangePage(){
    this.navCtrl.push(PasswordChangePage);
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public httpClient: HttpClient,
              public globalVar: GloaleVariablesProvider,
              public toastCtrl: ToastController,
              public translate: TranslateService
  ) {
    translate.setDefaultLang(globalVar.lang);
    console.log(124);
    console.log(this.globalVar.loginData);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  globalVar.loginData.authorization,
      })
    };
    this.data = httpClient.get(this.globalVar.apiUrl+'auth/profile?lang='+globalVar.lang,httpOptions);
    this.data
      .subscribe(data => {
        console.log(data);
        if (data.level == 'success'){
          this.profile = data.data;
          console.log(this.profile);
          this.exhibition = data.data.exhibitions;
        }
      },error=> {
        console.log(error);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
