import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import { HttpHeaders } from '@angular/common/http';
import {TabsPage} from "../tabs/tabs";
import {TranslateService} from "@ngx-translate/core";
/**
 * Generated class for the PasswordChangePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password-change',
  templateUrl: 'password-change.html',
})
export class PasswordChangePage {
  pChangeData  = {password: "", password_confirmation: "", current_password: ""};
  data:any;
  changePassword(){
    console.log(this.pChangeData);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  this.globalvar.loginData.authorization,
      })
    };
    this.data = this.httpClient.post(this.globalvar.apiUrl+'auth/profile/set-password?lang='+this.globalvar.lang,this.pChangeData,httpOptions);
    this.data
      .subscribe(data => {
        console.log(data);
        if (data.level == 'success'){
        alert(data.message)
        }
      },error=> {
        console.log(error);
        alert(error.error.message);
        if (error.error.errors.password[0] != undefined){
          alert(error.error.errors.password[0]);
        }
      });
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpClient: HttpClient,
              public globalvar: GloaleVariablesProvider,
              public translate: TranslateService,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordChangePage');
  }

}
