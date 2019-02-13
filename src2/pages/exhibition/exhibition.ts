import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {Tab1Page} from "../tab1/tab1";
import {NewsPage} from "../news/news";
import {AnnouncementsPage} from "../announcements/announcements";
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import { ToastController } from 'ionic-angular';
import {CompanyPage} from "../company/company";
@IonicPage()
@Component({
  selector: 'page-exhibition',
  templateUrl: 'exhibition.html',
})
export class ExhibitionPage {
  meta:any;
  data:any;
  exhibition = [];
  loadMore : any = true;
  noti:any = false;
  lang:any = false;
  openLnag(){
    if (this.lang == false){
      this.lang = true;
    } else {
      this.lang = false;
    }
  }
  openNot(){
    if (this.noti == false){
      this.noti = true;
    } else {
      this.noti = false;
    }
  }
  openCompany(url){
  console.log(url);
  this.navCtrl.push(CompanyPage,{url: url})
  }
  doInfinite(infiniteScroll) {
    if (this.loadMore == true){
      console.log('true');
      console.log(this.loadMore);
      if(this.meta.current_page < this.meta.total_pages){
        console.log('infinity start');
        let page = this.meta.current_page + 1;
        this.data = this.httpClient.get(this.globalVar.apiUrl+'exhibitions?page='+page+'&lang=ar');
        this.data
            .subscribe(data => {
              console.log(data);
              if (data.level == 'success'){
                console.log(data.data.data);
                for (let i = 0; i < data.data.data.length; i++) {
                  console.log(i);
                  this.exhibition.push(data.data.data[i])
                }
                this.meta = data.data.meta.pagination;
                console.log(this.exhibition);
                // this.toastShow('News updated');
                infiniteScroll.complete();
              }
            },error=> {
              console.log(error);
              // this.toastShow('An error accrue');
              infiniteScroll.complete();
            });
      }else {
        // this.toastShow('News already updated');
        this.loadMore = false;
        infiniteScroll.complete();
      }
    }else {
      console.log('false');
      console.log(this.loadMore);
      infiniteScroll.complete();
    }

  }
  constructor(public navCtrl: NavController,
              public httpClient: HttpClient,
              public globalVar: GloaleVariablesProvider,
              public toastCtrl: ToastController
  ) {
    this.data = httpClient.get(this.globalVar.apiUrl+'exhibitions?page=1&lang=ar');
    this.data
        .subscribe(data => {
          console.log(data);
          if (data.level == 'success'){
            console.log(data.data.data.length);
            for (let i = 0; i < data.data.data.length; i++) {
              this.exhibition.push(data.data.data[i])
            }
            console.log(this.exhibition);
          //   console.log(data.data.data);
          //   // this.news = data.data.data;
            this.meta = data.data.meta.pagination;
            console.log(this.meta);
          //   this.toastShow('data fetching complete');
          }
        },error=> {
          console.log(error);
          // this.toastShow('something wrong');
        });
  }

}