import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {TabsPage} from "../tabs/tabs";
import {Tab1Page} from "../tab1/tab1";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  click() {
    this.navCtrl.setRoot(TabsPage);
  }
  newTab1(){
    this.navCtrl.setRoot(Tab1Page)
  }
  constructor(public navCtrl: NavController) {

  }

}
