import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
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
  mediaFilePath = 'http://media.mw.metropolia.fi/wbma/uploads/';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
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
    this.navCtrl.push(JobInfoPage, { job: job }).catch();
  };

  // go to Offer page
  goToOffers = (file_id) => {
    this.jobProvider.getNumBid(file_id).subscribe(res => {
      this.navCtrl.push(OffersPage, { bidsArray: res }).catch();
    });
  };
}
