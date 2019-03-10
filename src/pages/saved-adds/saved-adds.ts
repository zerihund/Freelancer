import { Component } from '@angular/core';
import {
  ItemSliding,
  NavController,
  NavParams,
  ToastController,
} from 'ionic-angular';
import { JobProvider } from '../../providers/job/job';
import { DeleteFavourite, FavouriteResponse } from '../../interfaces/Media';
import { JobInfoPage } from '../job-info/job-info';

@Component({
  selector: 'page-my-saved-adds',
  templateUrl: 'saved-adds.html',
})

export class SavedAddsPage {
  savedJobsArray = [];

  constructor(
    private toastCtrl: ToastController,
    public navCtrl: NavController,
    public jobProvider: JobProvider,
    public navParams: NavParams,
  ) {
  }

  ionViewWillEnter() {
    this.getSavedJobs();
  }

  // Fetches all saved jobs of a user
  private getSavedJobs() {
    // Gets list of saved jobs
    this.jobProvider.getSavedJobs().subscribe(
      (result: FavouriteResponse[]) => {
        // fetches each job by it's file id from server and pushes  to array
        result.forEach(item => {
          this.jobProvider.getSingleJob(item.file_id).subscribe(
            result => {
              this.savedJobsArray.push(result);
            },
            error => {
              console.log(error);
            },
          );
        });
      },
    );
  }

  // removes a job from saved list
  unSaveJob = (fileId: number, slidingItem: ItemSliding, index: number) => {
    this.jobProvider.unSaveJob(fileId).subscribe(
      (result: DeleteFavourite) => {
        console.log(result);
        if (result.message === 'Favourite deleted') {
          this.showToast('Removed from saved list!');
          this.removeJobFromList(index);
        }
      },
      error => {
        console.log(error);
      },
    );
  };

  // go to job info page
  goToJobInfo = (job) => {
    this.navCtrl.push(JobInfoPage, {job: job}).catch();
  };

  // parse description json
  getDescription = (description) => {
    return JSON.parse(description);
  };

  // shows a toast with provided message
  showToast = (msg: string) => {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
    });
    toast.present().catch();
  };

  // removes the unsaved job from the list view
  removeJobFromList(index) {
    if (index > -1) {
      this.savedJobsArray.splice(index, 1);
    }
  }
}
