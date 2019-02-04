import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StarRatingModule } from 'ionic3-star-rating';

@IonicPage()
@Component({
  selector: 'page-brand',
  templateUrl: 'brand.html',
})
export class BrandPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrandPage');
  }

}
