import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JobProvider } from '../../providers/job/job';
import { FavouriteResponse } from '../../interfaces/Media';

@Component({
  selector: 'page-my-saved-adds',
  templateUrl: 'saved-adds.html',
})

export class SavedAddsPage {
  savedJobsArray = [];

  constructor(
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

  // parse description json
  getDescription = (description) => {
    return JSON.parse(description);
  };
}
