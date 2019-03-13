import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { JobProvider } from '../../providers/job/job';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-offers',
  templateUrl: 'offers.html',
})
export class OffersPage {

  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    public userProvider: UserProvider, public jobProvider: JobProvider,
    public alertController: AlertController) {
    this.bidsArray = this.navParams.get('bidsArray');
    console.log(this.bidsArray);
    this.bidsArray.forEach(bid => {
      this.userProvider.requestUserInfo(bid.user_id).subscribe(res => {
        bid.user = res;
      });
      bid.comment = JSON.parse(bid.comment);
    });
  }

  bidsArray;

  // go back to own jobs
  goToOwnJobs = () => {
    this.navCtrl.pop().catch();
  };

  // accept job offer
  acceptOffer = (file_id) => {
    if(this.navParams.get('job').title.includes('_accepted')) {
      this.showAlert('Offered is already accepted');
    } else {
      const json = {
        title: this.navParams.get('job').title + '_accepted',
      };
      console.log(file_id, json);
      this.jobProvider.acceptOffer(file_id, json).subscribe(res => {
        console.log(res);
        this.showAlert('Offer accepted');
        this.navCtrl.pop().catch();
      });
    }
  };

  showAlert = (notice) => {
    let alert = this.alertController.create({
      subTitle: notice,
      buttons: ['OK'],
      cssClass: 'alertCustomCss',
    });
    alert.present().catch();
  };
}
