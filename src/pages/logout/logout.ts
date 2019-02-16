import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import {WelcomePage} from "../welcome/welcome";

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage, public globalvar: GloaleVariablesProvider,
  public events: Events) {
    this.events.publish('user:logout');
    this.storage.remove('loginData');
    this.storage.remove('cart');
    this.globalvar.loginStatus = false;
    this.globalvar.loginData = null;
    navCtrl.setRoot(WelcomePage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

}
