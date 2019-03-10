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

//declare let google: any;

//declare var google: any;

@Component({
  selector: 'page-on-map',
  templateUrl: 'on-map.html',
})

export class OnMapPage {

  /*@ViewChild('map') mapRef: ElementRef;

  map: any;

  constructor(
    public navCtrl: NavController,
  ) {}

  ionViewDidLoad() {
    this.showMap();
    console.log(this.mapRef);
  }

  showMap() {
    // Location Lat Long
    const location = new google.maps.LatLng(60.2055, 24.6559);

    // map options
    const options = {
      center: location,
      zoom: 15,
    };

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);

  }

  addMarker(){

  }

  closeMap() {
    this.navCtrl.pop().catch();
  }*/

  @ViewChild('map') element;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public googleMaps: GoogleMaps,
    public plt: Platform,
    public viewCtrl: ViewController,
  ) {
  }

  ngAfterViewInit() {
    this.plt.ready().then(() => {
      this.initMap();
    });
  }

  initMap() {

    let map: GoogleMap = this.googleMaps.create(this.element.nativeElement);

    map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {

      let coordinates: LatLng = new LatLng(60.2055, 24.6559);

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
