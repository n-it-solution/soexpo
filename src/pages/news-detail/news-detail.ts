import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import {TranslateService} from "@ngx-translate/core";
/**
 * Generated class for the NewsDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news-detail',
  templateUrl: 'news-detail.html',
})
export class NewsDetailPage {
  url:any;
  data:any;
  news: any = {id: 0, title: "", published_at: "", featured_image: "", content:""};
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public httpClient: HttpClient,
              public globalVar: GloaleVariablesProvider,public translate: TranslateService,
  ) {
    translate.setDefaultLang(globalVar.lang);
    this.url = navParams.get('url');
    this.data = httpClient.get(this.url);
    this.data
        .subscribe(data => {
          console.log(data.level);
          if (data.level == 'success'){
            console.log(data.data);
            this.news = data.data;
          }
        },error=> {
          console.log(error);
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsDetailPage');
  }

}
