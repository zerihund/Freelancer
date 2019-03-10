import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JobInfoPage } from '../job-info/job-info';
import { JobProvider } from '../../providers/job/job';
import { CategoryPage } from '../category/category';
import { InfiniteScroll } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/user/user';
import { User } from '../../interfaces/Media';
import { NewPostPage } from '../new-post/new-post';
import { SearchPage } from '../search/search';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  constructor(
    public navCtrl: NavController,
    public jobProvider: JobProvider,
    public userProvider: UserProvider,
  ) {
  }

  totalJob = [];
  jobArray = [];
  jobs_per_page: number = 3;
  current_page = 1;
  previous_page = 0;
  searchQuery = '';

  ionViewDidEnter() {
    this.getAllJob();
  }

  avatar: string;
  user: User;

  // fetch all jobs with freelancer tag
  getAllJob = () => {
    this.infiniteScroll.enable(true);
    this.current_page = 1;
    this.previous_page = 0;
    this.jobArray = [];
    this.jobProvider.getFilesByTag('freelancer').subscribe(res => {
      this.totalJob = res.reverse().
        filter(job => !job.title.includes('_accepted'));
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

  // open new post if logged in
  goLoginOrNewPost = () => {
    if (!this.userProvider.loggedIn) {
      this.navCtrl.push(LoginPage).catch();
    }
    else {
      this.navCtrl.push(NewPostPage).catch();
    }
  };

  // filter job with searchQuery and go to Search page
  searchJobs = (event) => {
    const searchFiles = this.totalJob.filter(
      job => {
        return job.title.includes(this.searchQuery.toLowerCase()) ||
          this.getDescription(job.description).dscription.
            includes(this.searchQuery.toLowerCase()) || job.title === this.searchQuery.trim()
      });
    this.searchQuery = '';
    this.navCtrl.push(SearchPage, { searchFiles: searchFiles }).catch();
  };
}
