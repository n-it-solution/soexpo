import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import { ToastController } from 'ionic-angular';
import {CompanyPage} from "../company/company";
import {Storage} from '@ionic/storage';
import {ContactPage} from "../contact/contact";
import {TabsPage} from "../tabs/tabs";
/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  data:any;
  fetch:any;
  show:any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public httpClient: HttpClient,
              public globalVar: GloaleVariablesProvider,
              public toastCtrl: ToastController,
              private storage: Storage,
  ) {
    console.log(1);
    console.log(2);
    console.log(3);
    this.data = httpClient.get(this.globalVar.apiUrl+'get-content-by-slug/about-us?lang=en');
    this.data
      .subscribe(data => {
        console.log(data);
        if (data.level == 'success'){
          this.fetch = data.data;
          console.log(this.fetch);
          this.show = true;
        }
      },error=> {
        console.log(error);
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
