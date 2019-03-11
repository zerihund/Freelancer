import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JobProvider } from '../../providers/job/job';
import { OffersPage } from '../offers/offers';
import { JobInfoPage } from '../job-info/job-info';

@Component({
  selector: 'page-my-open-jobs',
  templateUrl: 'own-jobs.html',
})
export class OwnJobsPage {

  avatar: string;
  private ownJobsArray = [];
  filesObject: Object;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public jobProvider: JobProvider,
  ) {
  }

  ionViewWillEnter() {
    this.filesObject = this.navParams.get('files');
    this.avatar = this.navParams.get('avatar');
    this.getUserOwnJobs(this.filesObject);
  }

  // filter own jobs to exclude avatar file
  private getUserOwnJobs(filesObject) {
    this.ownJobsArray = [];
    // generate an array of jobs
    Object.keys(filesObject).map(key => {
      this.ownJobsArray.push(filesObject[key]);
    });
    this.ownJobsArray = this.ownJobsArray.filter(job =>
      job.file_id != parseInt(this.avatar));
  }

  // go to job info page
  goToJobInfo = (job) => {
    console.log(job);
    this.navCtrl.push(JobInfoPage,{ job: job }).catch();
  };

  // go to Offer page
  goToOffers = (job) => {
    this.jobProvider.getNumBid(job.file_id).subscribe(res => {
      this.navCtrl.push(OffersPage, { bidsArray: res, job: job}).catch();
    });
  };
}
