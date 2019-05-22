import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import { ToastController } from 'ionic-angular';
import { HttpHeaders } from '@angular/common/http';
import {UpdateProfilePage} from "../update-profile/update-profile";
import {TranslateService} from "@ngx-translate/core";
import {PasswordChangePage} from "../password-change/password-change";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  data:any;
  profile:any = {
    "id": 203,
    "name": "",
    "email": "",
    "confirmed": true,
    "roles": [
      "End User"
    ],
    "phone": "",
    "exhibitions": [
      "Building /Construction & Real Estate",
      "Food and Beverage",
      "Furniture"
    ],
    "about": null,
    "country_code": "",
    "city": "-",
    "job_title": null,
    "picture": "",
    "picture_thumb": "",
    "created_at": "02 Feb, 2019",
    "updated_at": "12 Feb, 2019",
    "authorization": "",
    "expires_at": ""
  };
  exhibition:any = [];
  openEditPage(){
    this.navCtrl.push(UpdateProfilePage);
  }
  openPassChangePage(){
    this.navCtrl.push(PasswordChangePage);
  }
  getPrfileDetail(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  this.globalVar.loginData.authorization,
      })
    };
    this.data = this.httpClient.get(this.globalVar.apiUrl+'auth/profile?lang='+this.globalVar.lang,httpOptions);
    this.data
      .subscribe(data => {
        console.log(data);
        if (data.level == 'success'){
          this.profile = data.data;
          console.log(this.profile);
          this.exhibition = data.data.exhibitions;
        }
      },error=> {
        console.log(error);
      });
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public httpClient: HttpClient,
              public globalVar: GloaleVariablesProvider,
              public toastCtrl: ToastController,
              public translate: TranslateService,
              private camera: Camera,
              private base64: Base64,
              public events: Events
  ) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    };

    // this.camera.getPicture(options).then((imageData) => {
    //   // imageData is either a base64 encoded string or a file URI
    //   // If it's base64 (DATA_URL):
    //   alert(imageData);
    //   this.base64.encodeFile(imageData).then((base64File: string) => {
    //     console.log(base64File);
    //     alert(base64File)
    //   }, (err) => {
    //     alert(err);
    //     console.log(err);
    //   });
    //   let base64Image = 'data:image/jpeg;base64,' + imageData;
    //   this.base64.encodeFile(base64Image).then((base64File: string) => {
    //     console.log(base64File);
    //     alert(base64File)
    //   }, (err) => {
    //     alert(err);
    //     console.log(err);
    //   });
    //   console.log(1);
    //   alert(base64Image);
    // }, (err) => {
    //   // Handle error
    // });
    translate.setDefaultLang(globalVar.lang);
    console.log(124);
    console.log(this.globalVar.loginData);
    this.getPrfileDetail();
    events.subscribe('profile:updated', (value) => {
      this.getPrfileDetail();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
