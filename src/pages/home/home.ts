import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JobInfoPage } from '../job-info/job-info';
import { JobProvider } from '../../providers/job/job';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public jobProvider: JobProvider) {
  }

  jobArray: Observable<any>;

  ionViewDidEnter() {
    this.getAllJob();
  }

  // fetch all jobs with freelancer tag
  getAllJob = () => {
    this.jobArray = this.jobProvider.getAllJobs();
  };

  // go to job info page
  goToJobInfo(params) {
    if (!params) params = {};
    this.navCtrl.push(JobInfoPage).catch();
  }

  // parse description json
  getDescription = (description) => {
    return JSON.parse(description).description;
  };

  // parse price json
  getPrice = (description) => {
    return JSON.parse(description).price;
  };
}
