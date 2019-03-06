import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-my-open-offers',
  templateUrl: 'sent-offers.html'
})
export class SentOffersPage {

  mediaFilePath = 'http://media.mw.metropolia.fi/wbma/uploads/'
  sentOffersJobsArray: any

  constructor(
    public navCtrl: NavController,
    ) {
  }

  ionViewWillenter(){

  }

}
