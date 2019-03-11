import {
  NavController,
  NavParams,
  Platform,
  ViewController,
} from 'ionic-angular';
import { Component, ViewChild, ElementRef } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  LatLng,
  MarkerOptions,
  Marker,
} from '@ionic-native/google-maps';
import { HttpClient } from '@angular/common/http';

//declare let google: any;

//declare var google: any;

@Component({
  selector: 'page-on-map',
  templateUrl: 'on-map.html',
})

export class OnMapPage {

  @ViewChild('map') element;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public googleMaps: GoogleMaps,
    public plt: Platform,
    public viewCtrl: ViewController,
    public http: HttpClient
  ) {
  }

  ngAfterViewInit() {
    this.plt.ready().then(() => {
      let address = this.navParams.get('address');
      this.http.get<any>('https://maps.googleapis.com/maps/api/geocode/json?address='+address+'&key=AIzaSyDBR4WyLw-4u1DZYsIb2-nD6Eaigz5FVtw').subscribe(res => {
        console.log(res);
        let coordinates: LatLng = new LatLng(res.results[0].geometry.location.lat, res.results[0].geometry.location.lng);
        this.initMap(coordinates);
      });
    });
  }

  initMap(coordinates) {


    let map: GoogleMap = this.googleMaps.create(this.element.nativeElement);

    map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {


      let position = {
        target: coordinates,
        zoom: 15,
      };

      map.animateCamera(position).catch();

      let markerOptions: MarkerOptions = {
        position: coordinates,
        title: 'Here',
      };

      const marker = map.addMarker(markerOptions).then((marker: Marker) => {
        marker.showInfoWindow();
      });
    });
  }

  closeMap() {
    this.navCtrl.pop().catch();
  }
}
