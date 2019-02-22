import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {Tab1Page} from "../tab1/tab1";
import {NewsPage} from "../news/news";
import {AnnouncementsPage} from "../announcements/announcements";
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import { ToastController } from 'ionic-angular';
import {CompanyPage} from "../company/company";
import {Storage} from '@ionic/storage';
import {NotificationPage} from "../notification/notification";
import { TranslateService } from '@ngx-translate/core';
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {CartPage} from "../cart/cart";
import { Events } from 'ionic-angular';
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
  lang:any;
  en:any = false;
  ar:any = false;
  changeLang(value){
    if (value == 'en'){
      this.ar = false;
      this.en = true;
      this.translate.setDefaultLang('en')
    } else {
      this.en = false;
      this.ar = true;
      this.translate.setDefaultLang('ar')
    }
    this.lang = value;
    this.storage.set('language',value);
    this.globalVar.lang = value;
    this.events.publish('lang:changed',value);
    this.getExhibition();
  }
  presentPrompt() {
    let cancelText;
    this.translate.get('exhibitionPage.change.cancel').subscribe(
      value => {
        cancelText = value;
      }
    );
    console.log(cancelText);
    let changeText;
    this.translate.get('exhibitionPage.change.change').subscribe(
      value => {
        changeText = value;
      }
    );
    console.log(changeText);
    let title;
    this.translate.get('exhibitionPage.change.title').subscribe(
      value => {
        title = value;
      }
    );
    console.log(title);
    let alert = this.alertCtrl.create({
      title: title,
      inputs: [
        {
          name: 'lang',
          placeholder: 'Username',
          type: 'radio',
          label: 'Arabic',
          value: 'ar',
          'checked': this.ar,
        },
        {
          name: 'lang',
          placeholder: 'Password',
          type: 'radio',
          label: 'English',
          value: 'en',
          'checked': this.en
        }
      ],
      buttons: [
        {
          text: cancelText,
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: changeText,
          handler: data => {
            console.log(data);
            this.changeLang(data)
          }
        }
      ]
    });
    alert.present();
  }
  openLnag(){
    this.presentPrompt();
  }
  openNot(){
    this.navCtrl.push(NotificationPage);
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
        this.data = this.httpClient.get(this.globalVar.apiUrl+'exhibitions?page='+page+'&lang='+this.lang);
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
  slider:any = [
    {
      logo: ""
    }
  ];
  sliderData;any;
  searchQuery: string = '';
  items: string[] = [];
  initializeItems() {
    console.log(this.safeData.length);
    console.log(1);
    for (let i = 0; i < this.safeData.length; i++) {
      this.exhibition.push(this.safeData[i]);
      console.log(this.safeData[i])
      // this.items.push(data.data.data[i]['name']);
      // this.safeData.push(data.data.data[i]);
    }
  }
  getItems(ev: any) {
    this.exhibition = this.safeData;
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.exhibition = this.exhibition.filter((item) => {
        return (item['name'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else {
      this.exhibition = this.safeData;
    }
  }
  safeData:any = [];
  getExhibition(){
    this.data = this.httpClient.get(this.globalVar.apiUrl+'exhibitions?page=1&lang='+this.lang);
    this.data
      .subscribe(data => {
        console.log(data);
        if (data.level == 'success'){
          console.log(data.data.data.length);
          this.exhibition = [];
          this.items = [];
          this.safeData = [];
          for (let i = 0; i < data.data.data.length; i++) {
            this.exhibition.push(data.data.data[i]);
            this.items.push(data.data.data[i]['name']);
            this.safeData.push(data.data.data[i]);
          }
          console.log(this.exhibition);
          this.storage.set("data", this.exhibition);
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
  totalCartData:any;
  getTotalCartData(){
    this.storage.get('cart').then((data)=>{
      if (data != null) {
        this.totalCartData = data.length;
      }
    });
  }
  openCart(){
    this.navCtrl.push(CartPage);
  }
  constructor(public navCtrl: NavController,
              public httpClient: HttpClient,
              public globalVar: GloaleVariablesProvider,
              public toastCtrl: ToastController,
              private storage: Storage,
              private alertCtrl: AlertController,
              public translate: TranslateService,
              public events: Events
  ) {
    events.subscribe('cart:updated', (total) => {
      console.log(total);
      this.totalCartData = total;
    });
    this.getTotalCartData();
    this.lang = globalVar.lang;
    translate.setDefaultLang(this.lang);
    if (this.lang == 'en'){
      this.en = true
    } else{
      this.ar = true
    }
    console.log(globalVar.loginData);
    this.getExhibition();
    this.initializeItems();
    this.storage.get('data').then((data)=>{
      if (data != null) {
        console.log(data)
      }
    });
    this.sliderData = httpClient.get(this.globalVar.apiUrl+'diamond-sponsors?lang='+this.lang);
    this.sliderData
      .subscribe(data => {
        console.log(data.data.data);
        if (data.level == 'success'){
          this.slider = data.data.data;
          console.log(this.slider)
        }
      },error=> {
        console.log(error);
      });
  }

}
