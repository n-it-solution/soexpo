import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {ExhibitionPage} from "../exhibition/exhibition";
import {NewsPage} from "../news/news";
import {AnnouncementsPage} from "../announcements/announcements";
import {TranslateService} from "@ngx-translate/core";
import {Events} from "ionic-angular";
import {GloaleVariablesProvider} from "../../providers/gloale-variables/gloale-variables";

@Component({
  templateUrl: './tabs.html'
})
export class TabsPage {

  tab1Root = NewsPage;
  tab2Root = AnnouncementsPage;
  tab3Root = ExhibitionPage;
  constructor(public translate: TranslateService,public events: Events,public globalVar: GloaleVariablesProvider,) {
    events.subscribe('lang:changed', (value) => {
      translate.setDefaultLang(value);
    });
    translate.setDefaultLang(globalVar.lang)
  }
}
