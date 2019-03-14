import { Component } from '@angular/core';
import {
  ItemSliding,
  NavController,
  NavParams,
  ToastController,
} from 'ionic-angular';
import { JobProvider } from '../../providers/job/job';
import { JobInfoPage } from '../job-info/job-info';
import { AddFavourite } from '../../interfaces/Media';
import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public jobProvider: JobProvider,
    public userProvider: UserProvider,
    private toastCtrl: ToastController,
  ) {
    this.category = this.navParams.get('category')
  }

  jobArray = [];
  category: string;

  ionViewDidEnter() {
    this.jobArray = [];
    this.getAllJob();
  }

  // fetch all jobs with freelancer tag
  getAllJob = () => {
    this.jobProvider.getFilesByTag('freelancer').subscribe(res => {
      res.forEach(job => {
        if(this.getDescription(job.description).category === this.category)
          this.jobArray.push(job);
        this.jobArray = this.jobArray.filter(job => !job.title.includes('_accepted'));
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

  // save a job for later review
  saveJob = (job, slidingItem: ItemSliding) => {
    // check if user is logged in
    // only logged in user can save a job
    // cannot save your own job
    if (!this.userProvider.loggedIn) {
      this.showToast('Sign in first, then save it!');
    } else {
      if(job.user_id === parseInt(localStorage.getItem('user_id'))) {
        this.showToast('Cannot save your own job');
      } else {
        let id = {'file_id': job.file_id};
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
      }
    }
    slidingItem.close();
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
