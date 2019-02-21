import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var google: any;
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapRef: ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  showMap(){
    const location = new google.maps.LatLng(33.738045, 73.084488);

    // map options
    const options = {
      center: location,
      zoom: 15,
      streetViewControl: false,
      // mapTypeId: 'satellite'
      // mapTypeId: 'terrain'
      mapTypeId: 'hybrid'
    };

    const map = new google.maps.Map
    (this.mapRef.nativeElement, options);
    this.addMarker(location, map);

    const location2 = new google.maps.LatLng(33.731045, 73.082488);
    this.addMarker(location2, map)
  }
  addMarker(position, map){
    return new google.maps.Marker({
      position,
      map
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.showMap();
  }

}
