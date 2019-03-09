import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JobInfoPage } from '../job-info/job-info';
import { JobProvider } from '../../providers/job/job';
import { CategoryPage } from '../category/category';
import { InfiniteScroll } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/user/user';
import { ToastController } from 'ionic-angular';
import {
  AddFavourite,
  FavouriteResponse,
  LoginResponse,
  TagReponse,
  User,
} from '../../interfaces/Media';
import { NewPostPage } from '../new-post/new-post';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(InfiniteScroll) infiniteScroll: InfiniteScroll;

  constructor(
    private toastCtrl: ToastController,
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
    this.navCtrl.push(JobInfoPage, {job: job}).catch();
  };

  // parse description json
  getDescription = (description) => {
    return JSON.parse(description);
  };

  // go to Category page
  goToCategory = (category: string) => {
    this.navCtrl.push(CategoryPage, {category: category}).catch();
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
    } else {
      this.navCtrl.push(NewPostPage).catch();
    }
  };

  // save a job for later review
  saveJob = (fileId) => {
    let id = {'file_id': fileId};
    this.jobProvider.saveJob(id).subscribe(
      (result: AddFavourite) => {
        if (result.message === 'Favourite added') {
          this.showToast('Saved to your list!');
        }
      },
      // shows error reason in case of error
      error => {
        console.log(error);
        if (error.error.reason.includes('Duplicate entry')) {
          this.showToast('Item is already in your list!');
        } else {
          this.showToast('Try again! item was not saved.');
        }
      },
    );
  };

  // shows a toast with provided message
  showToast = (msg: string) => {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
    });
    toast.present().catch();
  };
}
