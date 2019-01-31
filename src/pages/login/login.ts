import { Component } from '@angular/core';
import { IonicPage, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public alertCtrl: AlertController) {
  }

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
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

}
