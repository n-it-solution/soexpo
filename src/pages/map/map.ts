import { Component, ViewChild, ElementRef } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
declare var google: any;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})

export class MapPage {
  locations:any;
  map:any;
  @ViewChild('map') mapRef: ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams,) {
    console.log(this.navParams.get('locations'));
    this.locations = this.navParams.get('locations');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.showMap();
  }
  showMap(){
    const location = new google.maps.LatLng(this.locations[0]['latitude'], this.locations[0]['longitude']);

    // map options
    const options = {
      center: location,
      zoom: 8,
      streetViewControl: false,
      // mapTypeId: 'satellite'
      // mapTypeId: 'terrain'
      mapTypeId: 'hybrid'
    };

     this.map = new google.maps.Map
    (this.mapRef.nativeElement, options);
    // this.addMarker(location, map);
    for (let i = 0; i < this.locations.length; i++) {
      console.log(i);
      this.addMarker(new google.maps.LatLng(this.locations[i]['latitude'], this.locations[i]['longitude']), this.map);
    }
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
