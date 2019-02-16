import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import {NewsDetailPage} from "../news-detail/news-detail";
import { ToastController } from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  data:any;
  news = [];
  openNewsDetails(url){
    console.log(url);
  this.navCtrl.push(NewsDetailPage,{url:url})
  }
  toast:any;
  toastShow(msg){
    this.toast = this.toastCtrl.create({
      message: msg,
      duration: 1000
    });
    this.toast.present();
  }
  items = [];
  meta:any;
  loadMore : any = true;
  doInfinite(infiniteScroll) {
    if (this.loadMore == true){
      console.log('true');
      console.log(this.loadMore);
      if(this.meta.current_page < this.meta.total_pages){
        console.log('infinity start');
        let page = this.meta.current_page + 1;
        this.data = this.httpClient.get(this.globalVar.apiUrl+'news?lang=en&page='+1);
        this.data
            .subscribe(data => {
              console.log(data);
              if (data.level == 'success'){
                console.log(data.data.data);
                for (let i = 0; i < data.data.data.length; i++) {
                  console.log(i);
                  this.news.push(data.data.data[i])
                }
                this.meta = data.data.meta.pagination;
                console.log(this.news);
                this.toastShow('News updated');
                infiniteScroll.complete();
              }
            },error=> {
              console.log(error);
              this.toastShow('An error accrue');
              infiniteScroll.complete();
            });
      }else {
        this.toastShow('News already updated');
        this.loadMore = false;
        infiniteScroll.complete();
      }
    }else {
      console.log('false');
      console.log(this.loadMore);
      infiniteScroll.complete();
    }

  }
  lang:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public httpClient: HttpClient,
              public globalVar: GloaleVariablesProvider,
              public toastCtrl: ToastController,
              public translate: TranslateService,public events: Events,
  ) {
    this.lang = globalVar.lang;
    events.subscribe('lang:changed', (value) => {
      translate.setDefaultLang(value);
      this.lang = value;
    });
    for (let i = 0; i < 30; i++) {
      this.items.push( this.items.length );
    }
    this.data = httpClient.get(this.globalVar.apiUrl+'news?lang='+this.lang);
    this.data
        .subscribe(data => {
            console.log(data);
            if (data.level == 'success'){
              console.log(data.data.data.length);
              for (let i = 0; i < data.data.data.length; i++) {
                console.log(i);
                this.news.push(data.data.data[i])
              }
                console.log(data.data.data);
                // this.news = data.data.data;
                this.meta = data.data.meta.pagination;
                console.log(this.meta);
                this.toastShow('data fetching complete');
            }
        },error=> {
            console.log(error);
          this.toastShow('something wrong');
        });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

}
