import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JobProvider } from '../../providers/job/job';
import { JobInfoPage } from '../job-info/job-info';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public jobProvider: JobProvider) {
  }

  jobArray = [];

  ionViewDidEnter() {
    console.log('enter');
    this.jobArray = [];
    this.getAllJob();
  }

  // fetch all jobs with freelancer tag
  getAllJob = () => {
    this.jobProvider.getAllJobs().subscribe(res => {
      res.forEach(job => {
        if(this.getDescription(job.description).category === this.navParams.get('category'))
          this.jobArray.push(job)
      });
    });
  };

  // parse description json
  getDescription = (description) => {
    return JSON.parse(description);
  };

  // go to job info page
  goToJobInfo(job) {
    this.navCtrl.push(JobInfoPage, { job: job }).catch();
  }

}
