import { Component } from '@angular/core';
import {IonicPage, AlertController, NavController} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import {RegisterPage} from "../register/register";
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginData  = {email: "", password: ""};
  data:any;
  constructor(public alertCtrl: AlertController,
              public httpClient: HttpClient,
              public globalvar: GloaleVariablesProvider,
              public navCtrl: NavController
  ) {
  }
  openRegister(){
    this.navCtrl.push(RegisterPage);
  }
  loginFormSubmit(){
    console.log(this.loginData.email);
    if (this.loginData['email'] == '' || this.loginData['password'] == ''){
      alert('Enter Complete details in form')
    } else {
      this.data = this.httpClient.post(this.globalvar.apiUrl+'auth/login?lang=en',this.loginData);
      this.data
          .subscribe(data => {
              console.log(data);
                    if (data.level == 'success'){
                        console.log(data.data)
                    }
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
    this.data = this.httpClient.post(this.globalvar.apiUrl+'auth/reset-password?lang=en',email1);
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
      title: 'Forget Password',
      message: "Enter an email, you can forget your password with email!",
      inputs: [
        {
          name: 'title',
          placeholder: 'Enter Your Email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
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
