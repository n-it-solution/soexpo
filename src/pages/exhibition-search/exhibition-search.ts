import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TranslateService} from "@ngx-translate/core";
import {HttpClient} from "@angular/common/http";
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import {CompanyPage} from "../company/company";
import {BrandPage} from "../brand/brand";

/**
 * Generated class for the ExhibitionSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-exhibition-search',
  templateUrl: 'exhibition-search.html',
})
export class ExhibitionSearchPage {
  data:any;
  exhibition = [];
  keyword:any = '';
  openCompany(url,name){
    console.log(url);
    this.navCtrl.push(CompanyPage,{url: url,name: name});
    console.log(1);
  }
  openBrand(url){
    if (this.globalVar.loginStatus) {
      console.log(url);
      if(this.globalVar.loginData.confirmed){
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
  search(){
        this.data = this.httpClient.get(this.globalVar.apiUrl+'companies-advanced-search?search='+this.keyword+'&lang='+this.globalVar.lang);
        // this.data = this.httpClient.get(this.globalVar.apiUrl+'exhibitions?lang='+this.globalVar.lang);
        this.data
          .subscribe(data => {
            console.log(data);
            if (data.level == 'success'){
              this.exhibition = data.data.data;
              console.log(this.exhibition);
            }
          },error=> {
            console.log(error);
            // this.toastShow('something wrong');
          });


  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public translate: TranslateService,
              public httpClient: HttpClient,
              public globalVar: GloaleVariablesProvider,
              ) {
    this.translate.setDefaultLang(globalVar.lang)
    this.keyword = navParams.get('keyword');
    this.search();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExhibitionSearchPage');
  }

}
