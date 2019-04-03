import { Component } from '@angular/core';
import {Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import { ToastController } from 'ionic-angular';
import { HttpHeaders } from '@angular/common/http';
import {TabsPage} from "../tabs/tabs";
import {Storage} from "@ionic/storage";
import {TranslateService} from "@ngx-translate/core";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {Base64} from "@ionic-native/base64";

/**
 * Generated class for the UpdateProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-profile',
  templateUrl: 'update-profile.html',
})
export class UpdateProfilePage {
  data:any;
  profile:any = {
    "id": 203,
    "name": "Abdul Manan1",
    "email": "mirza.amanan@gmail.com",
    "confirmed": true,
    "roles": [
      "End User"
    ],
    "phone": "+923000421077",
    "exhibitions": [
      "Building /Construction & Real Estate",
      "Food and Beverage",
      "Furniture"
    ],
    "about": null,
    "country_code": "Pakistan",
    "city": "-",
    "job_title": null,
    "picture": "https://app.soexpo.net/assets/corals/images/avatars/avatar_3.png",
    "picture_thumb": "https://app.soexpo.net/assets/corals/images/avatars/avatar_3.png",
    "created_at": "02 Feb, 2019",
    "updated_at": "12 Feb, 2019",
    "authorization": "",
    "expires_at": "2020-02-12 16:17:58"
  };
  exhibition:any = [];
  startData:any = [{id:2,name:'abdul'}];
  result:any = [{id:1,name:'manan'},{id:2,name:'manan'}];
  exhibitionList:any = [{id:1,name:'manan'},{id:2,name:'manan'}];
  exhibitionList1:any = [];
  currentExhibition:any;
  addExhibition(){
    var i;
    for (i = 0; i < this.exhibitionList1.length; i++) {
      console.log(this.exhibitionList1);
      this.currentExhibition = this.exhibitionList1[i];
      console.log(this.currentExhibition);
      if((this.exhibition.find(e => e === this.currentExhibition.name))){
        if((this.userData.exhibitions.find(e => e === ''+this.currentExhibition.id+''))){
          console.log(this.userData.exhibitions);
        }else{
          this.userData.exhibitions.push(''+this.currentExhibition.id+'');
          console.log(this.userData.exhibitions);
        }
      }
      else {
      }
      // text += cars[i] + "<br>";
    }
  }
  checkAva(name,id){
    if((this.exhibition.find(e => e === name))){
      if((this.userData.exhibitions.find(e => e === ''+id+''))){
        // console.log(this.userData.exhibitions);
      }else{
        // this.userData.exhibitions.push(''+id+'');
        // console.log(this.userData.exhibitions);
      }
      return true
    }
    else {
      return false
    }
  }
  name2:string = 'hello';
  editData  = {name: ""};
  userData = {
    name: "", email: "", phone_number: "", about: "", job_title: "", exhibitions: []
  };
  registerData  = {name: "", email: "", password: "", password_confirmation: "", phone_number: "",exhibitions:[], terms: 0 };
  checkEditData(){
     console.log(this.userData);
    console.log(this.name2);
    console.log(1);
    alert(this.registerData.name);
    console.log(this.registerData);
    console.log(this.editData);
  }
  exhibition1:any = [];
  token:any;
  data1:any;
  checkEditData1(){
    // this.userData.exhibitions = this.exhibition1;
    console.log(this.exhibition1);
     console.log(this.userData);
     // this.userData.job_title = 'helllo';
    const httpOptions1 = {
      headers: new HttpHeaders({
        'Authorization':  this.token,
        'Content-Type' : 'application/json',
        // 'X-Requested-With' : 'XMLHttpRequest'
      })
    };
    console.log(this.userData);
    if (this.userData.exhibitions.length > 5){
      alert('Exhibition no more then 5')
    } else {
      this.data1 = this.httpClient.post(this.globalvar.apiUrl+'auth/profile?lang=en',this.userData,httpOptions1);
      this.data1
        .subscribe(data => {
          alert(JSON.stringify(data));
          console.log(data);
          if (data.level == 'success'){
            alert(data.message);
            this.globalVar.updateAbleLoginData = data.data;
            console.log(this.globalVar.updateAbleLoginData);
            this.storage.set('updateAbleLoginData',data.data);
          }
          console.log(1);
          // this.navCtrl.setRoot(TabsPage);
        },error=> {
          console.log(error);
          alert(JSON.stringify(error));
          if(error.status == 422){
            alert(error.error.message)
          }
          console.log(error.error.message)
        });
    }
  }
  getBrand(ev: any) {
    const val = ev.target.value;
    console.log(val);
  }
  lang:any = 'en';
  userData1:any;
  pic:any;
  editThisPic:boolean = false;
  editPic(){
    // this.userData['new'] = 'hh';
    console.log(this.userData);
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.SAVEDPHOTOALBUM
    };
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // alert(imageData);
      this.base64.encodeFile(imageData).then((base64File: string) => {
        console.log(base64File);
        alert(base64File);
        var base64Img2 = "";
        base64Img2 = base64File.replace("data:image/*;charset=utf-8;base64,", "");
        this.userData['profile_image'] = base64Img2;
        alert(JSON.stringify(this.userData));
        this.userData.job_title = base64Img2;
      }, (err) => {
        alert(err);
        console.log(JSON.stringify(err));
      });
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
      // this.base64.encodeFile(base64Image).then((base64File: string) => {
      //   console.log(base64File);
      //   alert(base64File)
      // }, (err) => {
      //   alert(err);
      //   console.log(err);
      // });
      // console.log(1);
      // alert(base64Image);
    }, (err) => {
      alert(err);
      // Handle error
    });
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public httpClient: HttpClient,
              public globalVar: GloaleVariablesProvider,
              public toastCtrl: ToastController,
              public globalvar: GloaleVariablesProvider,
              private storage: Storage,
              public events: Events,
              public translate: TranslateService,private camera: Camera,
              private base64: Base64
  ) {
    this.lang = globalVar.lang;
    translate.setDefaultLang(this.lang);
    this.userData1 = globalVar.updateAbleLoginData;
    this.userData.name = this.userData1.name;
    this.userData.email = this.userData1.email;
    this.userData.phone_number = this.userData1.phone;
    this.userData.job_title = this.userData1.job_title;
    this.userData.about = this.userData1.about;
    this.token = this.globalVar.loginData.authorization;
    this.exhibition = this.globalvar.updateAbleLoginData.exhibitions;
    console.log(this.userData1);
    console.log(this.userData1);
    const httpOptions = {
      headers: new HttpHeaders({
        'Accept' : 'application/json'
      })
    };
    // startData:any = [];
    // console.log((this.startData.find(e => e.id === this.result[id]['id'])));

    // console.log((this.startData.find(e => e.id === this.result[1]['id'])));
    if((this.startData.find(e => e.id === this.result[0]['id']))){
      console.log('fetched')
    }
    else {
      console.log('fetched1')
    }
    this.data = httpClient.get(globalVar.apiUrl+'get-exhibitions-list?lang='+this.lang,httpOptions);
    // this.data = httpClient.get('https://app.soexpo.net/api/get-countries-list');
    this.data
      .subscribe(data => {
        console.log(data);
        if (data.level == 'success'){
          // this.registerData.email = 'hello@gmail.com';
          this.exhibitionList1 = data.data.exhibitions;
          console.log(this.exhibitionList1);
          this.addExhibition();
        }
      },error=> {
        console.log(error);
        if(error.status == 422){
          alert(error.error.message)
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateProfilePage');
  }

}
