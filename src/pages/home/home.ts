import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JobInfoPage } from '../job-info/job-info';
import { JobProvider } from '../../providers/job/job';
import { CategoryPage } from '../category/category';
import { InfiniteScroll } from 'ionic-angular';
import {LoginPage} from "../login/login";
import {UploadImagePage} from "../upload-image/upload-image";
import {UserProvider} from "../../providers/user/user";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  constructor(public navCtrl: NavController, public jobProvider: JobProvider ,public userProvider:UserProvider) {
  }

  totalJob = [];
  jobArray = [];
  jobs_per_page: number = 3;
  current_page = 1;
  previous_page = 0;
  mediaFilePath = 'http://media.mw.metropolia.fi/wbma/uploads/';

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
      this.totalJob = res.reverse();
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

  // go to log in page
  goLogin = () => {
    this.navCtrl.push(LoginPage).catch();
  };

  // paging mechanism for ionic infinite scroll
  loadMoreJobs = (event) => {
    if (this.current_page < this.numPages()) {
      setTimeout(() => {
        this.previous_page = this.current_page * 3;
        this.current_page++;
        this.jobArray = this.jobArray.concat(
          this.totalJob.slice(this.previous_page, this.current_page * 3));
        event.complete();
      }, 1000);
    } else {
      console.log('false is called');
      event.enable(false);
    }
  };

  // calculate number of pages
  numPages = () => {
    return Math.ceil(this.totalJob.length / this.jobs_per_page);
  };
}
