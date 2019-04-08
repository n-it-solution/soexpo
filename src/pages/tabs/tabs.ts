import { Component } from '@angular/core';
import {ExhibitionPage} from "../exhibition/exhibition";
import {NewsPage} from "../news/news";
import {AnnouncementsPage} from "../announcements/announcements";
import {TranslateService} from "@ngx-translate/core";
import {Events, NavController, NavParams} from "ionic-angular";
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import {ProfilePage} from "../profile/profile";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  templateUrl: './tabs.html'
})
export class TabsPage {

  tab1Root = NewsPage;
  tab2Root = AnnouncementsPage;
  tab3Root = ExhibitionPage;
  tab4Root = ProfilePage;
  tabIndex: number = 2;
  annData:any;
  totalAnn:number;
  constructor(public translate: TranslateService,public events: Events,public globalVar: GloaleVariablesProvider,
              public navParams: NavParams,public httpClient: HttpClient
  ) {
    let openPageInTab = this.navParams.get('openPageInTab');
    if(openPageInTab != undefined){
      this.tab4Root = openPageInTab;
      this.tabIndex = 3 ;
    }else {

    }
    // this.tabIndex = 3;
    // this.events.subscribe('open:tab', (data) => {
    //   this.tab4Root
    //   console.log(data);
    // });
    events.subscribe('lang:changed', (value) => {
      translate.setDefaultLang(value);
    });
    translate.setDefaultLang(globalVar.lang);
    if(globalVar.loginStatus){
      if(globalVar.loginData.confirmed){
        const httpOptions = {
          headers: new HttpHeaders({
            'Authorization':  this.globalVar.loginData.authorization,
          })
        };
        this.annData = httpClient.get(this.globalVar.apiUrl+'announcements?lang='+this.globalVar.lang,httpOptions);
        this.annData
          .subscribe(data => {
            console.log(data);
            if (data.level == 'success'){
              console.log(data.data);
              this.totalAnn = 0;
              for (let i = 0; i < data.data.data.length; i++) {
                if(!data.data.data[i].is_read){
                  this.totalAnn = this.totalAnn + 1;
                }
                // this.items.push(data.data.data[i]['name']);
                // this.safeData.push(data.data.data[i]);
              }
            }
          },error=> {
            console.log(error);
          });
      }else {
      }
    }else {
    }
  }
}
