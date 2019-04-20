import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import { HttpHeaders } from '@angular/common/http';
/**
 * Generated class for the AnnouncementDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-announcement-detail',
  templateUrl: 'announcement-detail.html',
})
export class AnnouncementDetailPage {
  data:any;
  markData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public translate: TranslateService,public httpClient: HttpClient,
              public globalVar: GloaleVariablesProvider,public events: Events
  ) {
    translate.setDefaultLang('en');
    // console.log(navParams.get('data'));
    this.data = navParams.get('data');
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  this.globalVar.loginData.authorization
      })
    };
    console.log(httpOptions);
    console.log(httpOptions);
    this.markData = httpClient.get(this.data.mark_as_read_url,httpOptions);
    this.markData
      .subscribe(data => {
        console.log(data);
        if (data.level == 'success'){
          this.events.publish('ann:changed',data);
        }
      },error=> {
        console.log(error);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AnnouncementDetailPage');
  }

}
