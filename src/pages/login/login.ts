import { Component } from '@angular/core';
import {IonicPage, AlertController, NavController, Events} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import {RegisterPage} from "../register/register";
import {TabsPage} from "../tabs/tabs";
import {TranslateService} from "@ngx-translate/core";
import {Storage} from "@ionic/storage";
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginData  = {email: "", password: ""};
  data:any;
  lang:any;
  constructor(public alertCtrl: AlertController,
              public httpClient: HttpClient,
              public globalvar: GloaleVariablesProvider,
              public navCtrl: NavController,
              public translate: TranslateService,
              private storage: Storage,
              public events: Events
  ) {
    this.lang = globalvar.lang;
    translate.setDefaultLang(this.lang);
    this.getalertText();
    events.subscribe('lang:changed', (value) => {
      translate.setDefaultLang(value);
      this.lang = value;
      this.getalertText();
    });

  }
  alertTextTitle: any;
  alertTextdec: any;
  alertTextplaceText: any;
  alertTextcancel: any;
  alertTextsubmit: any;
  getalertText(){
    this.translate.get('LoginPage.alert.title').subscribe(
      value => {
        // value is our translated string
        this.alertTextTitle = value;
      }
    );
    this.translate.get('LoginPage.alert.dec').subscribe(
      value => {
        this.alertTextdec = value;
      }
    );
    this.translate.get('LoginPage.alert.placeText').subscribe(
      value => {
        this.alertTextplaceText = value;
      }
    );
    this.translate.get('LoginPage.alert.cancel').subscribe(
      value => {
        this.alertTextcancel = value;
      }
    );
    this.translate.get('LoginPage.alert.submit').subscribe(
      value => {
        this.alertTextsubmit = value;
      }
    )

  }
  openRegister(){
    this.navCtrl.push(RegisterPage);
  }
  loginFormSubmit(){
    console.log(this.loginData.email);
    if (this.loginData['email'] == '' || this.loginData['password'] == ''){
      let alertText = '';
      this.translate.get('LoginPage.enterComplete').subscribe(
        value => {
          // value is our translated string
          alertText = value;
        }
      );
      alert(alertText);
    } else {
      this.data = this.httpClient.post(this.globalvar.apiUrl+'auth/login?lang=en',this.loginData);
      this.data
          .subscribe(data => {
              console.log(data);
                    if (data.level == 'success'){
                        console.log(data.data);
                        this.storage.set('loginData',data.data);
                        this.storage.set('updateAbleLoginData',data.data);
                        this.globalvar.loginStatus = true;
                        this.globalvar.loginData = data.data;
                      this.globalvar.updateAbleLoginData = data.data;
                        console.log(data.data);
                      this.events.publish('user:logged',data.data);
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
  forgetRequest(email){
    let email1 = {email:email};
    this.data = this.httpClient.post(this.globalvar.apiUrl+'auth/reset-password?lang='+this.lang,email1);
    this.data
        .subscribe(data => {
          console.log(data);
          alert(data.message);
        },error=> {
          console.log(error);
          if(error.status == 422){
            alert(error.error.message)
          }
        });
  };

  forgetpass() {
    let prompt = this.alertCtrl.create({
      title: this.alertTextTitle,
      message: this.alertTextdec,
      inputs: [
        {
          name: 'title',
          placeholder: this.alertTextplaceText
        },
      ],
      buttons: [
        {
          text: this.alertTextcancel,
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: this.alertTextsubmit,
          handler: data => {
            console.log(data.title);
            console.log(111);
            console.log('Saved clicked');
            this.forgetRequest(data.title);
          }
        }
      ]
    });
    prompt.present();
  }

}
