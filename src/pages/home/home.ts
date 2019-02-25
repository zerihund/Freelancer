import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JobInfoPage } from '../job-info/job-info';
import { JobProvider } from '../../providers/job/job';
import { CategoryPage } from '../category/category';
import { InfiniteScroll } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  constructor(public navCtrl: NavController, public jobProvider: JobProvider) {
  }

  totalJob = [];
  jobArray = [];
  jobs_per_page: number = 3;
  current_page = 1;
  previous_page = 0;

  ionViewDidEnter() {
    this.getAllJob();
  }

  // fetch all jobs with freelancer tag
  getAllJob = () => {
    this.infiniteScroll.enable(true);
    this.current_page = 1;
    this.previous_page = 0;
    this.jobArray = [];
    this.jobProvider.getAllJobs().subscribe(res => {
      this.totalJob = res;
      this.jobArray = this.jobArray.concat(
        this.totalJob.slice(this.previous_page, this.current_page * 3));
    });
  };

  // go to job info page
  goToJobInfo = (job) => {
    this.navCtrl.push(JobInfoPage, { job: job }).catch();
  };

  // parse description json
  getDescription = (description) => {
    return JSON.parse(description);
  };

  // go to Category page
  goToCategory = (category: string) => {
    this.navCtrl.push(CategoryPage, { category: category }).catch();
  };

  loadMoreJobs = (event) => {
    if (this.current_page < this.numPages()) {
      this.previous_page = this.current_page * 3;
      this.current_page++;
      this.jobArray = this.jobArray.concat(
        this.totalJob.slice(this.previous_page, this.current_page * 3));
      event.complete();
    } else event.enable(false);
  };

  // calculate number of pages
  numPages = () => {
    return Math.ceil(this.totalJob.length / this.jobs_per_page);
  };
}
