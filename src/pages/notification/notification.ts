import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import { ToastController } from 'ionic-angular';
import { HttpHeaders } from '@angular/common/http';
import {Storage} from "@ionic/storage";
import {TranslateService} from "@ngx-translate/core";
/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  data:any;
  notification:any;
  lang:any;
  token:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public httpClient: HttpClient,
              public globalVar: GloaleVariablesProvider,
              public toastCtrl: ToastController,
              public translate: TranslateService,public events: Events,
  ) {
    events.subscribe('lang:changed', (value) => {
      translate.setDefaultLang(value);
      this.lang = value;
    });

    events.subscribe('user:logged', (data) => {
      this.token = data.authorization
    });
    this.token = this.globalVar.loginData.authorization;
    this.lang = globalVar.lang;
    if(globalVar.loginStatus){
      if(globalVar.loginData.confirmed){
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  this.token,
        })
      };
      this.data = httpClient.get(this.globalVar.apiUrl+'notifications?lang='+this.lang,httpOptions);
      this.data
        .subscribe(data => {
          console.log(data);
          if (data.level == 'success'){
            console.log(data.data);
            this.notification = data.data.data;
            console.log(this.notification);
          }
        },error=> {
          console.log(error);
        });
      }else {
        alert('Confirm your profile to access this page');
        navCtrl.pop();
      }
    }else {
      alert('Login first to access this page');
      navCtrl.pop();
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

}
