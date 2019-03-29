import { Component } from '@angular/core';
import {ExhibitionPage} from "../exhibition/exhibition";
import {NewsPage} from "../news/news";
import {AnnouncementsPage} from "../announcements/announcements";
import {TranslateService} from "@ngx-translate/core";
import {Events, NavController, NavParams} from "ionic-angular";
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";
import {ProfilePage} from "../profile/profile";

@Component({
  templateUrl: './tabs.html'
})
export class TabsPage {

  tab1Root = NewsPage;
  tab2Root = AnnouncementsPage;
  tab3Root = ExhibitionPage;
  tab4Root = ProfilePage;
  tabIndex: number = 2;
  constructor(public translate: TranslateService,public events: Events,public globalVar: GloaleVariablesProvider,
              public navParams: NavParams,
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
    translate.setDefaultLang(globalVar.lang)
  }
}
