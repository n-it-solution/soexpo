import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import { ToastController } from 'ionic-angular';
import { HttpHeaders } from '@angular/common/http';
import {BrandPage} from "../brand/brand";
import { TranslateService } from '@ngx-translate/core';
import {Storage} from "@ionic/storage";
import {TabsPage} from "../tabs/tabs";

/**
 * Generated class for the CompanyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company',
  templateUrl: 'company.html',
})
export class CompanyPage {
  data:any;
  companies:any;
  sponsor_silver:any;
  sponsor_golden:any;
  sponsor_participants:any;
  sponsor_silver_show : boolean = false;
  sponsor_golden_show : boolean = false;
  sponsor_participants_show : boolean = false;
  skeltonData = [{
    "id": 1,
    "name": "hello",
    "logo" : "",
    "show_url": "https://app.soexpo.net/api/companies/v1oz1Yz27j",
    "rating_url": "https://app.soexpo.net/api/companies/rate/v1oz1Yz27j",
  }];
  showData:boolean = false;
  openBrand(url){
    if (this.loginStatus) {
      console.log(url);
      if(this.loginData.confirmed){
        this.navCtrl.push(BrandPage, {url: url})
      }else {
        let alertText = '';
        this.translate.get('companyPage.activateFirst').subscribe(
          value => {
            // value is our translated string
            alertText = value;
          }
        );
        alert(alertText);
      }
    }else {
      let alertText = '';
      this.translate.get('companyPage.loginFirst').subscribe(
        value => {
          // value is our translated string
          alertText = value;
        }
      );
      alert(alertText);
    }
  }
  safeData:any;
  getItems(ev: any) {
    this.companies = this.safeData;
    const val = ev.target.value;
    if (val && val.trim() != '') {
      this.getData('search',val)
      // this.companies = this.companies.filter((item) => {
      //   return (item['name'].toLowerCase().indexOf(val.toLowerCase()) > -1);
      // })
    }else {
      this.companies = this.safeData;
    }
  }
  lang:any;
  getData(search,query){
      const httpOptions = {
        headers: new HttpHeaders({
          // 'Authorization':  this.globalVar.loginData.authorization,
          'Content-Type' : 'application/json'
        })
      };
      if (search == 'search'){
        console.log(this.navParams.get('url')+'?lang='+this.lang+'&search='+query);
        this.data = this.httpClient.get(this.navParams.get('url')+'?lang='+this.lang+'&search='+query,httpOptions);
      } else {
        this.data = this.httpClient.get(this.navParams.get('url')+'?lang='+this.lang,httpOptions);
      }
      // this.data = this.httpClient.get(this.navParams.get('url')+'?lang='+this.lang,httpOptions);
      this.data
        .subscribe(data => {
          console.log(data);
          if (data.level == 'success'){
            console.log(data.data.companies);
            this.companies = data.data.companies;
            console.log(this.companies);
            this.safeData = data.data.companies;
            this.sponsor_silver = data.data.sponsor_silver;
            this.sponsor_golden = data.data.sponsor_golden;
            if(data.data.sponsor_golden.length > 0){
              console.log(data.data.sponsor_golden.length);
              this.sponsor_golden_show = true;
            }
            if(data.data.sponsor_silver.length > 0){
              console.log(data.data.sponsor_silver.length);
              this.sponsor_silver_show = true;
            }
            if (data.data.slider !== null){
              this.sponsor_participants = data.data.slider.slides;
              if(data.data.slider.slides.length > 0){
                console.log(data.data.slider.slides.length);
                this.sponsor_participants_show = true;
              }
            }
            console.log(this.sponsor_participants);
            this.showData = true;
            console.log('all set')
            // console.log(this.sponsor_silver);
          }
        },error=> {
          console.log(error);
          if(error.status == 422){
            // alert(error.error.message)
          }
          // console.log(error.error.message)
        });

  }
  openCompany(url){
    console.log(url);
    this.navCtrl.push(CompanyPage,{url: url})
  }

  loginStatus:any = false;
  loginData:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public httpClient: HttpClient,
              public globalVar: GloaleVariablesProvider,
              public toastCtrl: ToastController,
              public translate: TranslateService,
              private storage: Storage,
  ) {
    console.log(this.navParams.get('name'));
    console.log(2);
    this.lang = globalVar.lang;
    translate.setDefaultLang(this.lang);
    this.loginData = this.globalVar.loginData;
    this.loginStatus = globalVar.loginStatus;
    this.getData('noSearch','query');
    this.sponsor_silver = this.skeltonData;
    this.companies = this.skeltonData;
    this.sponsor_participants = this.skeltonData;
    this.sponsor_golden = this.skeltonData;
    // console.log(navParams.get('url'));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyPage');
  }

}
