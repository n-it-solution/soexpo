import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import {NewsDetailPage} from "../news-detail/news-detail";
import { ToastController } from 'ionic-angular';
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
  items = [];
  meta:any;
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    if(this.meta.current_page == this.meta.total_pages){
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
              this.toast.setMessage('News updated');
              this.toast.present();
              infiniteScroll.complete();
            }
          },error=> {
            console.log(error);
            this.toast.setMessage('An error accrue');
            this.toast.present();
            infiniteScroll.complete();
          });
    }else {
      this.toast.setMessage('News already updated');
      this.toast.present();
      infiniteScroll.complete();
    }
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public httpClient: HttpClient,
              public globalVar: GloaleVariablesProvider,
              public toastCtrl: ToastController
  ) {
    for (let i = 0; i < 30; i++) {
      this.items.push( this.items.length );
    }
    this.toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 1000
    });
    this.data = httpClient.get(this.globalVar.apiUrl+'news?lang=en');
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
                this.toast.setMessage('Data fetching complete');
                this.toast.present();
            }
        },error=> {
            console.log(error);
        });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

}
