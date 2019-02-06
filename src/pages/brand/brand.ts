import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StarRatingModule } from 'ionic3-star-rating';
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import { ToastController } from 'ionic-angular';
import { HttpHeaders } from '@angular/common/http';
@IonicPage()
@Component({
  selector: 'page-brand',
  templateUrl: 'brand.html',
})
export class BrandPage {
  tab:any;
  changeTab(tab){
  this.tab = tab;
  }
  data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public httpClient: HttpClient,
              public globalVar: GloaleVariablesProvider,
              public toastCtrl: ToastController
  ) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjllZGJlYzk2OGRlOTU1MzE4N2ZjZTAxMzQ3MmI3YTgwMzQzMmMzODcxOTYzNGI1YmJhNDdlOGNjNTA0N2U5MzFlODAwN2JiZThhMzhkNmQ3In0.eyJhdWQiOiIxIiwianRpIjoiOWVkYmVjOTY4ZGU5NTUzMTg3ZmNlMDEzNDcyYjdhODAzNDMyYzM4NzE5NjM0YjViYmE0N2U4Y2M1MDQ3ZTkzMWU4MDA3YmJlOGEzOGQ2ZDciLCJpYXQiOjE1NDk0MDI2MjgsIm5iZiI6MTU0OTQwMjYyOCwiZXhwIjoxNTgwOTM4NjI4LCJzdWIiOiIyMDYiLCJzY29wZXMiOltdfQ.qoPACzhi-A66WdaMnRcwl7iGaeVayMEcRhgb0MenEbpHT-ldA2ggMcfsqIFgyJFgco6hULTS1kdDPVipWWbPyhuNg4iMot_HU7tqP6ZC4SylYKVFNj3fQuhi46yRZSmoulZ0d5m0fl70XsCXOLsRiYawVlOImiFjdMLl8vMTDxcYv1R5Ut9fArD-R-N8McYg3W2PO2xxd4DzAK6Rb0N-FY_1M2hHiRH7RJRcBHnn-wuaqXPVkY9KCVEYlW1FJSwmHEhMybxi5WVmiZnNN0QdzhQ8w6DBhXRJroafev95Zq_Sxj7zCT9i8xSDZMx8k4E_FSwb6KwvjPKKIcpa4N2dTMmtvh_LBXWqkZLF5hXtL6VyjZi7Vye-yIvy5gsQB9t9N4oBg96rIGGZ-q4LktSciSXpEDro1rNHjcTnz2iNaBKrnfVn0DZpzeWKa7m2tAeN6TD3LTXkGuaiCNASc__lQR-AMznvuxsYmuiDtZwyCGO-1-ZCqzXVG10o2lqgaNFiEnwvHqannGulcL-HQCuhq-JIowM9H39ly0R0OiSsm2mn-z1k1vRP48CxHcv29Smlzh8qjqE60l3D1YFH4nZ_vLfSFECOW1mcKpchhSVoWeyVMbF0EHqVg8gMGxhhvOxhfKgufjbrvrLzwH1ZBLR948byULQiKsBd434eEGO5u9Y',
      })
    };
    this.data = httpClient.get(this.globalVar.apiUrl+'companies/jO0eMYeRAo?lang=en',httpOptions);
    this.data
        .subscribe(data => {
          console.log(data);
          if (data.level == 'success'){
            console.log(data.data);
          }
        },error=> {
          console.log(error);
          // this.toastShow('something wrong');
        });
    this.tab = 'models';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrandPage');
  }

}
