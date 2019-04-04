import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { StarRatingModule } from 'ionic3-star-rating';
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import { ToastController } from 'ionic-angular';
import { HttpHeaders } from '@angular/common/http';
import {ProDetailPage} from "../pro-detail/pro-detail";
import {TabsPage} from "../tabs/tabs";
import { TranslateService } from '@ngx-translate/core';
import {Storage} from '@ionic/storage';
import { Events } from 'ionic-angular';
import {MapPage} from "../map/map";
import {DomSanitizer,SafeResourceUrl,} from '@angular/platform-browser';
@IonicPage()
@Component({
  selector: 'page-brand',
  templateUrl: 'brand.html',
})
export class BrandPage {
  tab:any;
  videos:any = [];
  gallery:any = [];
  showGallery: boolean = false;
  videoTestLink = 'https://www.youtube.com/embed/1F_UQFlPiKU';
  videoTestLink2: any;
  changeTab(tab){
    if(tab == 'location'){
      this.navCtrl.push(MapPage,{locations : this.locations});
    }else {
      this.tab = tab;
    }
  }
  data:any;
  // overRating:any;
  brands:any = [];
  members:any;
  companyDetails:any =
      {
    "id": 20,
    "name": "Basmat Beautiful Complex",
    "country": "Saudi Arabia",
    "city": "Riyadh",
    "logo": "",
    "exhibitions": [
      "Health & Medicine"
    ],
    "address": "مخرج14-حي الروابي",
    "phone": "0566555082",
    "email": "dentalanddermal2015@yahoo.com11111111",
    "fax": "-",
    "website": "-",
    "description": "طب وتقويم الاسنان والجلدية",
    "participant_sponsor": false,
    "show_url": "https://app.soexpo.net/api/companies/jO0eMYeRAo",
    "rating_url": "https://app.soexpo.net/api/companies/rate/jO0eMYeRAo",
    "average_rating": "4.0000",
    "rating": {
      "products_satisfaction": {
        "criteria": "الرضا عن المنتجات",
        "my_rating": 1,
        "average_value": "4.0000"
      },
      "team_members_response": {
        "criteria": "الرضا عن أستجابة فريق الشركة",
        "my_rating": 1,
        "average_value": "4.5000"
      },
      "over_all_experience_evaluation": {
        "criteria": "التقييم العام للشركة",
        "my_rating": 1,
        "average_value": "3.5000"
      }
    }
  };
  openLocation(){
    this.navCtrl.push(MapPage);
  }
  showRating:any = false;
  start:any;
  end:any;
  show:any;
  hide:any;
  showDate(id){
    this.show = id;
    this.hide = id;
  }
  endFun(ev){
    this.end = ev.year+'-'+('0' + ev.month).slice(-2)+'-'+('0' + ev.day).slice(-2)+' '+('0' + ev.hour).slice(-2)+':'+('0' + ev.minute).slice(-2);
  }
  startFun(ev){
    this.start = ev.year+'-'+('0' + ev.month).slice(-2)+'-'+('0' + ev.day).slice(-2)+' '+('0' + ev.hour).slice(-2)+':'+('0' + ev.minute).slice(-2);
  }
  appSubmit(url){
    console.log(url);
    // console.log(this.start);
    this.meetingUrl = url;
    console.log(this.start,this.end);
    this.submitApp(this.start,this.end);
  }
  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Appointment',
      inputs: [
        {
          name: 'first',
          placeholder: 'Start date',
          type: 'datetime-local',
        },
        {
          name: 'last',
          placeholder: 'End Date',
          type: 'datetime-local'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log(data);
            console.log(data.first);
            this.submitApp(data.first,data.last);
          }
        }
      ]
    });
    alert.present();
  }
  // presentPrompt() {
  //   let alert = this.alertCtrl.create({
  //     title: 'Appointment',
  //     inputs: [
  //       {
  //         name: 'first',
  //         placeholder: 'Start date',
  //         type: 'datetime-local',
  //       },
  //       {
  //         name: 'last',
  //         placeholder: 'End Date',
  //         type: 'datetime-local'
  //       }
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Send',
  //         handler: data => {
  //           console.log(data);
  //           console.log(data.first);
  //           this.submitApp(data.first,data.last);
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }
  postData1:any;
  submitApp(first,last){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  this.globalVar.loginData.authorization,
      })
    };
    let postData = {from_date: first,to_date:last};
    console.log(postData);
    this.postData1 = this.httpClient.post(this.meetingUrl+'?lang=en',postData,httpOptions);
    this.postData1
      .subscribe(data => {
        console.log(data);
        if (data.level == 'success'){
          console.log(data.data);
          alert(data.message)
        }
      },error=> {
        console.log(error);
        if(error.status == 422){
          alert(error.error.message)
        }
        console.log(error.error.message)
      });
  }
  oepnProDetail(url){
    console.log('111');
    this.navCtrl.push(ProDetailPage,{url:url});
  }
  openBookApp(url){
  this.meetingUrl = url;
    this.presentPrompt();
  }
  meetingUrl:any;
  cart: any = [];
  addToCart(id,image,url){
    this.cart.push( {
      company_id: this.companyDetails.id,
      brand_id: id,
      quantity: 1,
      image: image,
      show_url: url
    });
    console.log(this.cart);

    this.storage.set("cart", this.cart);
    this.events.publish('cart:updated',this.cart.length);
  }
  addToCartr(id){
    let index = this.cart.findIndex(e => e.brand_id === id);
    this.cart.splice(index, 1);
    console.log(this.cart);
    console.log(this.cart.length);
    this.storage.set("cart", this.cart);
    this.events.publish('cart:updated',this.cart.length);
  }
  addToCartCheck(id){
    if((this.cart.find(e => e.brand_id === id))){
      return false
    }
    else {
      return true
    }
  }
  getTeam(ev: any) {
    this.members = this.membersSafeData;
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.members = this.members.filter((item) => {
        return (item['name'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else {
      this.members = this.membersSafeData;
    }
  }
  brandSafeData:any = [];
  getBrand(ev: any) {
    this.brands = this.brandSafeData;
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.brands = this.brands.filter((item) => {
        return (item['name'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else {
      this.brands = this.brandSafeData;
    }
  }
  membersSafeData:any;
  lang:any;
  loginData:any;
  loginStatus:any;
  locations:any;
  check11(url){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public httpClient: HttpClient,
              public globalVar: GloaleVariablesProvider,
              public toastCtrl: ToastController,
              private alertCtrl: AlertController,
              public translate: TranslateService,
              private storage: Storage,
              public events: Events,
              public sanitizer:DomSanitizer
  ) {
    this.lang = globalVar.lang;
    translate.setDefaultLang(this.lang);
    this.loginData = this.globalVar.loginData;
    this.loginStatus = globalVar.loginStatus;
    this.storage.get('cart').then((data)=>{
      if (data != null) {
        console.log(data);
        this.cart = data;
        console.log('cart+++' + this.cart)
      }
    });
    console.log(navParams.get('url'));
    // this.overRating = 1;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  this.loginData.authorization,
      })
    };
    this.data = httpClient.get(navParams.get('url')+'?lang='+this.lang,httpOptions);
    this.data
        .subscribe(data => {
          console.log(data);
          if (data.level == 'success'){
            console.log(data.data);
            this.locations = data.data.locations;
            this.companyDetails = data.data.companyDetails;
            console.log(data.data.brands.data);
            this.members = data.data.members.data;
            this.membersSafeData = data.data.members.data;
            console.log(this.members);
            for (let i = 0; i < data.data.brands.data.length; i++) {
              this.brands.push(data.data.brands.data[i]);
              this.brandSafeData.push(data.data.brands.data[i]);
            }
            for (let i = 0; i < data.data.videos.length; i++) {
              let safeLink = this.check11(data.data.videos[i]);
              this.videos.push(safeLink);
            }
            // this.videos = data.data.videos;
            console.log(this.videos);
            this.gallery = data.data.gallery;
            this.showGallery = true;
            console.log(this.brands);
            this.showRating = true;
          }
        },error=> {
          console.log(error);
        });
    this.tab = 'models';
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad BrandPage');
    this.videoTestLink2 = this.sanitizer.bypassSecurityTrustResourceUrl(this.videoTestLink);
    console.log(this.videoTestLink2);
  }

}
