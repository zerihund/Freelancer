import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TagReponse } from '../../interfaces/Media';
import { JobProvider } from '../../providers/job/job';

@Component({
  selector: 'page-job-info2',
  templateUrl: 'job-info2.html'
})
export class JobInfo2Page {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public jobProvider: JobProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.myOffer = this.navParams.get('offer');
    this.getProfileImage();
    this.descriptionJSON = this.getDescription(this.myOffer.info.description);
    this.userInfoJSON = this.getUser(this.descriptionJSON.user);
  }

  myOffer;
  descriptionJSON;
  userInfoJSON;
  avatar: string;
  mediaPath = 'http://media.mw.metropolia.fi/wbma/uploads/';

  // go back to my sent-offers page
  goToMyOffer = () => {
    this.navCtrl.pop().catch();
  };

  // parse comment json
  getComment = (comment) => {
    return JSON.parse(comment);
  };

  // parse description json
  getDescription = (description) => {
    return JSON.parse(description);
  };

  // parse user json
  getUser = (user) => {
    return JSON.parse(user);
  };

  // get user avatar
  getProfileImage = () => {
    this.jobProvider.getFilesByTag('profile_freelancer').subscribe(
      (response: TagReponse[]) => {
        response.forEach(file => {
          if (file.user_id === this.myOffer.info.user_id) {
            this.avatar = file.file_id.toString();
          }
        });
      },
      error => {
        console.log(error);
      },
    );
  };
}
