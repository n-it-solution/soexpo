import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import {TabsPage} from "../tabs/tabs";
import { HttpHeaders } from '@angular/common/http';
import {TranslateService} from "@ngx-translate/core";
import {LoginPage} from "../login/login";
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  echibitionData:any;
  exhibitions:any;
  registerData  = {name: "", email: "", password: "", password_confirmation: "", phone_number: "",exhibitions:[], terms: 0 };
  submitForm(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'X-Requested-With' : 'XMLHttpRequest'
      })
    };
  console.log(this.registerData);
    if (this.registerData['name'] == '' || this.registerData['password'] == '' || this.registerData['email'] == '' || this.registerData['password_confirmation'] == '' || this.registerData['phone_number'] == '' || this.registerData['terms'] == 0)
    {
      alert('Enter Complete details in form')
    } else
      {
      this.data = this.httpClient.post(this.globalvar.apiUrl+'auth/register?lang=en',this.registerData,httpOptions);
      this.data
        .subscribe(data => {
          console.log(data);
          if (data.level == 'success'){
            alert(data.message)
          }
          console.log(1);
          this.navCtrl.setRoot(TabsPage);
        },error=> {
          console.log(error);
          if(error.status == 422){
            alert(error.error.message)
          }
          console.log(error.error.message)
        });
      console.log('success')
    }
  }
  accept(){
  if (this.registerData['terms'] == 0){
    this.registerData['terms'] = 1;
    console.log(this.registerData);
  }else {
    this.registerData['terms'] = 0;
    console.log(this.registerData);
  }
  }
  openTerms(){
    this.iab.create('https://ionicframework.com/');

  };
  data:any;
  lang:any;
  openLogin(){
    this.navCtrl.push(LoginPage)
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public httpClient: HttpClient,
              public globalvar: GloaleVariablesProvider,
              public translate: TranslateService,public events: Events,
              private iab: InAppBrowser
  ) {
    events.subscribe('lang:changed', (value) => {
      translate.setDefaultLang(value);
      this.lang = value;
    });
    this.lang = this.globalvar.lang;
    this.echibitionData = httpClient.get(globalvar.apiUrl+'get-exhibitions-list?lang='+this.lang);
    this.echibitionData
      .subscribe(data => {
        console.log(data);
        if (data.level == 'success'){
        this.exhibitions = data.data.exhibitions;
        console.log(this.exhibitions);
        }
      },error=> {
        console.log(error);

      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

}
