import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import { ToastController } from 'ionic-angular';
import { HttpHeaders } from '@angular/common/http';
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
    "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjEwM2I2NjY1NTk2ZWIzOTYxZTc3MTJlNTA1OTc4MzQ0YjkwYWJmNjMyNjU4Y2E0ZjExNTg5NWNmNmRjMWYyN2JhYTZjZDg1MzhjMWQyYmIwIn0.eyJhdWQiOiIxIiwianRpIjoiMTAzYjY2NjU1OTZlYjM5NjFlNzcxMmU1MDU5NzgzNDRiOTBhYmY2MzI2NThjYTRmMTE1ODk1Y2Y2ZGMxZjI3YmFhNmNkODUzOGMxZDJiYjAiLCJpYXQiOjE1NDk5ODgyNzgsIm5iZiI6MTU0OTk4ODI3OCwiZXhwIjoxNTgxNTI0Mjc4LCJzdWIiOiIyMDMiLCJzY29wZXMiOltdfQ.m0S0eU2vM7ZX195-arXHINNHGvfKLwVT4Vfcn0kSqJ7Lrejh-a738zQs1Lwoh7PQEozzDJCoO1oiClp-l1Jdc7teh2Fhq5fWONLUhbjnNMNMXdS5_Puou97j6N3r7ZUU5CHOTTyJFxAlA50wZEmnuqb-ieJeJxjIMCQ3RQl-ORoxZicyj38AQHpgEre8GyIgpJaYBS743qked_KbB5rMtvx82mmBdkPqtPPNfd2Tiu4HL25TemzhNb7U5dLhreIaXjJTEdvCcVoSfqqKI15eJQlwbjDDNiaBJU3dzqdVMGsLIxhQAy3DFvJLRMuZhvdEUyjDZleJREb0xmCLxOpH46-yL_rt2K7J0rgy5RJMCx6AhaeWqZbnnKteVIT6L3xh_4XMz_nZHwgu9Bm3J0xoeIaHQAQSj_yXejfgUY2WgnjtVvHjlFj6f-dKWboLYSxVRmBoxq8qCIvBIf0OfERnam2ko4hF3KiUI5vPky0CTKnyUEMDQWotmAnzHG2ir6vIIjiYP6N81N9i0OibqKAdlQ4nv9eCUfIK48WymCRP6i2ep-TeCVo32qdijJUl_HWg0GhqM6c4cGpgNCvYrLhJYK28ef87hKg0JeKFXsK_I6DV0b9ySFqlRtCY4LEHC_FaTsEpDxRvWY_CSYTcTRbEy_7WTZVlfEZTryompj8eUyk",
    "expires_at": "2020-02-12 16:17:58"
  };
  exhibition:any = [
    "Building /Construction & Real Estate",
    "Food and Beverage",
    "Furniture"
  ];
  startData:any = [{id:2,name:'abdul'}];
  result:any = [{id:1,name:'manan'},{id:2,name:'manan'}];
  exhibitionList:any = [{id:1,name:'manan'},{id:2,name:'manan'}];
  exhibitionList1:any;
  checkAva(name){
    if((this.exhibition.find(e => e === name))){
      return true
    }
    else {
      return false
    }
  }
  name2:string = 'hello';
  editData  = {name: ""};
  registerData  = {name: "", email: "", password: "", password_confirmation: "", phone_number: "",exhibitions:[], terms: 0 };
  checkEditData(){
    console.log(this.name2);
    console.log(1);
    alert(this.registerData.name);
    console.log(this.registerData);
    console.log(this.editData);
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public httpClient: HttpClient,
              public globalVar: GloaleVariablesProvider,
              public toastCtrl: ToastController
  ) {
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
    this.data = httpClient.get(globalVar.apiUrl+'get-exhibitions-list?lang=en',httpOptions);
    // this.data = httpClient.get('https://app.soexpo.net/api/get-countries-list');
    this.data
      .subscribe(data => {
        console.log(data);
        if (data.level == 'success'){
          this.registerData.email = 'hello@gmail.com';
          this.exhibitionList1 = data.data.exhibitions;
          console.log(this.exhibitionList1);
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
