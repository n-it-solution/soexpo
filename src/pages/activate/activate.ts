import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import { ToastController } from 'ionic-angular';
import { HttpHeaders } from '@angular/common/http';
import {TranslateService} from "@ngx-translate/core";
import {Storage} from "@ionic/storage";
import {WelcomePage} from "../welcome/welcome";
import {LoginPage} from "../login/login";
/**
 * Generated class for the ActivatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activate',
  templateUrl: 'activate.html',
})
export class ActivatePage {
  data:any;
  lang:any;
  codeSubmit(){
    console.log(this.code.code);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json',
        'X-Requested-With' : 'XMLHttpRequest'
      })
    };
      this.data = this.httpClient.get(this.globalVar.apiUrl+'auth/confirm/'+this.code.code+'?lang='+this.lang,httpOptions);
    // this.data = this.httpClient.get(this.navParams.get('url')+'?lang='+this.lang,httpOptions);
    this.data
      .subscribe(data => {
        console.log(data);
        if (data.level == 'success'){
        alert(data.message);
        this.navCtrl.push(LoginPage);
        }
      },error=> {
        console.log(error);
        if(error.status == 422){
          alert(error.error.message)
        }
        // console.log(error.error.message)
      });
  }
  code = {
    code: ''
  };
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpClient: HttpClient,
              public globalVar: GloaleVariablesProvider,
              public toastCtrl: ToastController,
              public translate: TranslateService,
              private storage: Storage,
              public events: Events
  ) {
    events.subscribe('lang:changed', (value) => {
      translate.setDefaultLang(value);
      this.lang = value;
    });
    this.lang = globalVar.lang;
    translate.setDefaultLang(this.globalVar.lang);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivatePage');
  }

}
