import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {WelcomePage} from "../welcome/welcome";

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // navCtrl.setRoot(WelcomePage);
    setTimeout(() => {
      this.navCtrl.setRoot(WelcomePage);
    }, 6000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');
  }

}
