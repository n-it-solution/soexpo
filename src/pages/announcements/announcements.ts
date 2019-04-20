import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import { ToastController } from 'ionic-angular';
import { HttpHeaders } from '@angular/common/http';
import {AnnouncementDetailPage} from "../../pages/announcement-detail/announcement-detail";
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the AnnouncementsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-announcements',
  templateUrl: 'announcements.html',
})
export class AnnouncementsPage {
  data:any;
  announcements:any;
  annDetails(data){
    this.navCtrl.push(AnnouncementDetailPage,{data:data});
    // console.log(data);
  }
  token:any;
  lang:any;
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
    this.lang = globalVar.lang;
    if(globalVar.loginStatus){
      this.token = this.globalVar.loginData.authorization;
    }
    translate.setDefaultLang(this.globalVar.lang);
    if(globalVar.loginStatus){
      if (globalVar.loginData.confirmed) {
        const httpOptions = {
        headers: new HttpHeaders({
          'Authorization':  this.token
        })
      };
        this.data = httpClient.get(this.globalVar.apiUrl+'announcements?lang='+this.lang,httpOptions);
        this.data
          .subscribe(data => {
            console.log(data);
            if (data.level == 'success'){
              console.log(data.data);
              this.announcements = data.data.data;
              console.log(this.announcements);
            }
          },error=> {
            console.log(error);
          });
      }
      else {
        let alertText = '';
        this.translate.get('NotificationPage.confirmProfileFirst').subscribe(
          value => {
            // value is our translated string
            alertText = value;
          }
        );
        alert(alertText);
      }

    }else {
      let alertText = '';
      this.translate.get('NotificationPage.loginFirst').subscribe(
        value => {
          // value is our translated string
          alertText = value;
        }
      );
      alert(alertText);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnouncementsPage');
  }

}
