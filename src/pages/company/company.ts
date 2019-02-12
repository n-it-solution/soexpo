import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import { ToastController } from 'ionic-angular';
import { HttpHeaders } from '@angular/common/http';
import {BrandPage} from "../brand/brand";
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
  skeltonData = [{
    "id": 1,
    "name": "",
    "logo" : "",
    "show_url": "https://app.soexpo.net/api/companies/v1oz1Yz27j",
    "rating_url": "https://app.soexpo.net/api/companies/rate/v1oz1Yz27j",
  }];
  openBrand(url){
      console.log(url);
      this.navCtrl.push(BrandPage,{url:url})
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public httpClient: HttpClient,
              public globalVar: GloaleVariablesProvider,
              public toastCtrl: ToastController
  ) {
    this.sponsor_silver = this.skeltonData;
    this.companies = this.skeltonData;
    this.sponsor_participants = this.skeltonData;
    this.sponsor_golden = this.skeltonData;
    // console.log(navParams.get('url'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'ss',
        'Content-Type' : 'application/json'
      })
    };
    this.data = httpClient.get(navParams.get('url'),httpOptions);
    // this.data = httpClient.get('https://app.soexpo.net/api/get-countries-list');
    this.data
        .subscribe(data => {
            console.log(data);
            if (data.level == 'success'){
                // console.log(data.data.companies);
                this.companies = data.data.companies;
                this.sponsor_silver = data.data.sponsor_silver;
                // this.sponsor_golden = data.data.sponsor_golden;
                this.sponsor_participants = data.data.sponsor_participants;
                console.log(this.companies);
                console.log(this.sponsor_silver);
            }
        },error=> {
            console.log(error);
            if(error.status == 422){
                // alert(error.error.message)
            }
            // console.log(error.error.message)
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyPage');
  }

}
