import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import { ToastController } from 'ionic-angular';
import { HttpHeaders } from '@angular/common/http';
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the ProDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pro-detail',
  templateUrl: 'pro-detail.html',
})
export class ProDetailPage {
  data:any;
  detail:any;
  gallery:any;
  show:any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public httpClient: HttpClient,
              public globalVar: GloaleVariablesProvider,
              public toastCtrl: ToastController,
              public translate: TranslateService
  ) {
    translate.setDefaultLang('en');
    console.log(navParams.get('url'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization':  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjllZGJlYzk2OGRlOTU1MzE4N2ZjZTAxMzQ3MmI3YTgwMzQzMmMzODcxOTYzNGI1YmJhNDdlOGNjNTA0N2U5MzFlODAwN2JiZThhMzhkNmQ3In0.eyJhdWQiOiIxIiwianRpIjoiOWVkYmVjOTY4ZGU5NTUzMTg3ZmNlMDEzNDcyYjdhODAzNDMyYzM4NzE5NjM0YjViYmE0N2U4Y2M1MDQ3ZTkzMWU4MDA3YmJlOGEzOGQ2ZDciLCJpYXQiOjE1NDk0MDI2MjgsIm5iZiI6MTU0OTQwMjYyOCwiZXhwIjoxNTgwOTM4NjI4LCJzdWIiOiIyMDYiLCJzY29wZXMiOltdfQ.qoPACzhi-A66WdaMnRcwl7iGaeVayMEcRhgb0MenEbpHT-ldA2ggMcfsqIFgyJFgco6hULTS1kdDPVipWWbPyhuNg4iMot_HU7tqP6ZC4SylYKVFNj3fQuhi46yRZSmoulZ0d5m0fl70XsCXOLsRiYawVlOImiFjdMLl8vMTDxcYv1R5Ut9fArD-R-N8McYg3W2PO2xxd4DzAK6Rb0N-FY_1M2hHiRH7RJRcBHnn-wuaqXPVkY9KCVEYlW1FJSwmHEhMybxi5WVmiZnNN0QdzhQ8w6DBhXRJroafev95Zq_Sxj7zCT9i8xSDZMx8k4E_FSwb6KwvjPKKIcpa4N2dTMmtvh_LBXWqkZLF5hXtL6VyjZi7Vye-yIvy5gsQB9t9N4oBg96rIGGZ-q4LktSciSXpEDro1rNHjcTnz2iNaBKrnfVn0DZpzeWKa7m2tAeN6TD3LTXkGuaiCNASc__lQR-AMznvuxsYmuiDtZwyCGO-1-ZCqzXVG10o2lqgaNFiEnwvHqannGulcL-HQCuhq-JIowM9H39ly0R0OiSsm2mn-z1k1vRP48CxHcv29Smlzh8qjqE60l3D1YFH4nZ_vLfSFECOW1mcKpchhSVoWeyVMbF0EHqVg8gMGxhhvOxhfKgufjbrvrLzwH1ZBLR948byULQiKsBd434eEGO5u9Y',
      })
    };
    // this.data = httpClient.get(navParams.get('url')+'lang=en',httpOptions);
    this.data = httpClient.get(navParams.get('url')+'?lang=en',httpOptions);
    this.data
      .subscribe(data => {
        console.log(data);
        if (data.level == 'success'){
          console.log(data.data);
          this.detail = data.data.brandDetails;
          this.gallery = data.data.gallery;
          this.show = true;
          console.log(this.detail);
        }
      },error=> {
        console.log(error);
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProDetailPage');
  }

}
