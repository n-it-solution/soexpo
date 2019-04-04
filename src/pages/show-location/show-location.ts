import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
declare var google: any;

/**
 * Generated class for the ShowLocationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-location',
  templateUrl: 'show-location.html',
})
export class ShowLocationPage {
  map:any;
  @ViewChild('map') mapRef: ElementRef;
  lat:any;	lng:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  console.log(this.navParams.get('lat'));
  console.log(this.navParams.get('lng'));

  }

  ionViewDidLoad() {
    this.lat = this.navParams.get('lat');
    this.lng = this.navParams.get('lng');
    this.showMap();
  }

  showMap(){
    const location = new google.maps.LatLng(this.lat, this.lng);

    // map options
    const options = {
      center: location,
      zoom: 8,
      streetViewControl: false,
      // mapTypeId: 'satellite'
      // mapTypeId: 'terrain'
      mapTypeId: 'hybrid'
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    // this.addMarker(location, map);
    this.addMarker(new google.maps.LatLng(this.lat, this.lng), this.map);

    // const location2 = new google.maps.LatLng(21.422487, 39.826206);
    // this.addMarker(location2, this.map)
  }

  addMarker(position, map){
    return new google.maps.Marker({
      position,
      map
    });
  }

}
