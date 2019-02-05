import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import {ExhibitionPage} from "../exhibition/exhibition";
import {NewsPage} from "../news/news";
import {AnnouncementsPage} from "../announcements/announcements";

@Component({
  templateUrl: './tabs.html'
})
export class TabsPage {

  tab1Root = NewsPage;
  tab2Root = AnnouncementsPage;
  tab3Root = ExhibitionPage;

  constructor() {

  }
}
