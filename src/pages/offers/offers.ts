import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../interfaces/Media';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',
})
export class OffersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider) {
    this.bidsArray = this.navParams.get('bidsArray');
    this.bidsArray.forEach(bid => {
      this.userProvider.requestUserInfo(bid.user_id).subscribe(res => {
        bid.user = res;
      });
      bid.comment = JSON.parse(bid.comment);
    });
  }

  ionViewWillEnter() {
  }

  bidsArray;

  // go back to own jobs
  goToOwnJobs = () => {
    this.navCtrl.pop().catch();
  };

}
