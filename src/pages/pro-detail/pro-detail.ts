import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import { ToastController } from 'ionic-angular';
import { HttpHeaders } from '@angular/common/http';
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the ProDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pro-detail',
  templateUrl: 'pro-detail.html',
})
export class ProDetailPage {
  data:any;
  detail:any;
  gallery:any;
  show:any = false;
  lang:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public httpClient: HttpClient,
              public globalVar: GloaleVariablesProvider,
              public toastCtrl: ToastController,
              public translate: TranslateService
  ) {
    this.lang = globalVar.lang;
    translate.setDefaultLang(this.lang);
    console.log(navParams.get('url'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  globalVar.loginData.authorization,
      })
    };
    // this.data = httpClient.get(navParams.get('url')+'lang=en',httpOptions);
    this.data = httpClient.get(navParams.get('url')+'?lang='+this.lang,httpOptions);
    this.data
      .subscribe(data => {
        console.log(data);
        if (data.level == 'success'){
          console.log(data.data);
          this.detail = data.data.brandDetails;
          this.gallery = data.data.gallery;
          this.show = true;
          console.log(this.detail);
        }
      },error=> {
        console.log(error);
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProDetailPage');
  }

}
