import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JobProvider } from '../../providers/job/job';
import { JobInfo2Page } from '../job-info2/job-info2';

@Component({
  selector: 'page-my-open-offers',
  templateUrl: 'sent-offers.html',
})
export class SentOffersPage {

  constructor(public navCtrl: NavController, public jobProvider: JobProvider) {
  }

  ionViewWillEnter() {
    this.jobProvider.getOffers().subscribe(res => {
      this.offersArray = res;
      this.offersArray.forEach(offer => {
        this.jobProvider.getSingleJob(offer.file_id).subscribe(res => {
          offer.info = res;
        });
      });
      console.log(this.offersArray);
    });
  }

  offersArray;

  // parse description json
  getDescription = (description) => {
    return JSON.parse(description);
  };

  // go to job info page
  goToJobInfo = (offer) => {
    this.navCtrl.push(JobInfo2Page, { offer: offer }).catch();
  };

}
