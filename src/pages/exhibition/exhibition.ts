import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {Tab1Page} from "../tab1/tab1";
import {NewsPage} from "../news/news";
import {AnnouncementsPage} from "../announcements/announcements";

@IonicPage()
@Component({
  selector: 'page-exhibition',
  templateUrl: 'exhibition.html',
})
export class ExhibitionPage {

  OpenNews() {
    this.navCtrl.setRoot(NewsPage);
  }
  OpenAnnouncement(){
    this.navCtrl.setRoot(AnnouncementsPage)
  }
  OpenHome(){
    this.navCtrl.setRoot(ExhibitionPage)
  }
  constructor(public navCtrl: NavController) {
  }

}
