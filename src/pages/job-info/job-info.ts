import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-job-info',
  templateUrl: 'job-info.html'
})
export class JobInfoPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.job = this.navParams.get('job');
    this.descriptionJSON = this.getDescription(this.job.description);
    this.userInfoJSON = this.getUser(this.descriptionJSON.user);
  }

  job;
  descriptionJSON;
  userInfoJSON;
  priceOffer = 500;


  // parse description json
  getDescription = (description) => {
    return JSON.parse(description);
  };

  // parse user json
  getUser = (user) => {
    return JSON.parse(user);
  };

  goToHome = () => {
    this.navCtrl.pop().catch();
  };

}
