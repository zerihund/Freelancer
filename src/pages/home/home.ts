import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JobInfoPage } from '../job-info/job-info';
import { JobProvider } from '../../providers/job/job';
import { Observable } from 'rxjs';
import { CategoryPage } from '../category/category';

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
  goToJobInfo(job) {
    this.navCtrl.push(JobInfoPage, { job: job }).catch();
  }

  // parse description json
  getDescription = (description) => {
    return JSON.parse(description);
  };

  goToCategory = (category: string) => {
    this.navCtrl.push(CategoryPage, {category: category}).catch();
  };
}
