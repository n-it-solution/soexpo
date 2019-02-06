import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StarRatingModule } from 'ionic3-star-rating';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab = 'location';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrandPage');
  }

}
