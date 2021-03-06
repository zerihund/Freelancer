import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { TagReponse, User } from '../../interfaces/Media';
import { SavedAddsPage } from '../saved-adds/saved-adds';
import { OwnJobsPage } from '../own-jobs/own-jobs';
import { SentOffersPage } from '../sent-offers/sent-offers';
import { stringify } from 'querystring';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { JobProvider } from '../../providers/job/job';

@Component({
  selector: 'page-my-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  private user: User;
  private username: string;
  private userId: number;
  private email: string;
  private avatar: string;
  private numberOfOwnJobs: number;
  private userFiles: any;
  private avatarExist = false;

  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider,
    public jobProvider: JobProvider,
  ) {
    this.user = JSON.parse(localStorage.getItem('user')).user;
  }

  ionViewWillEnter() {
    if (this.user === null) {
      this.user = JSON.parse(localStorage.getItem('user')).user;
    }
    this.getProfileInfo();
  }

  // go to saved add
  goToSavedAdds = () => {
    this.navCtrl.push(SavedAddsPage, {
      userId: this.user.user_id,
    }).catch();
  };

  //go to own jobs page
  goToMyOwnJobs = (files) => {
    this.navCtrl.push(OwnJobsPage, {
      files: files,
      avatar: this.avatar,
    }).catch();
  };

  // go to sent offer page
  goToMySentOffers = () => {
    this.navCtrl.push(SentOffersPage).catch();
  };

  // go to edit page
  goToEditProfile = () => {
    this.navCtrl.push(EditProfilePage, {
      userId: this.user.user_id,
      avatar: this.avatar,
    }).catch();
  };

  // log user out
  logout = () => {
    localStorage.clear();
    this.userProvider.loggedIn = false;
    this.user = null;
    this.avatarExist = false;
    this.navCtrl.parent.select(1);
  };

  // get user info from local storage
  getProfileInfo = () => {
    this.username = localStorage.getItem('username');
    this.userId = parseInt(localStorage.getItem('user_id'));
    this.email = localStorage.getItem('email');
    this.getProfileImage();
    this.getUserFiles();
  };

  // get user avatar
  getProfileImage = () => {
    this.jobProvider.getFilesByTag('profile_freelancer').subscribe(
      (response: TagReponse[]) => {
        response.forEach(file => {
          if (file.user_id === this.userId) {
            this.avatar = file.file_id.toString();
            this.avatarExist = true;
            console.log(this.avatarExist);
          }
        });
        if(!this.avatarExist) {
          this.avatar = null;
          this.avatarExist = false;
        }
      },
      error => {
        console.log(error);
      },
    );
  };

  // get user's own jobs
  private getUserFiles = () => {
    this.jobProvider.getJobByUserId(this.userId).subscribe(
      result => {
        this.numberOfOwnJobs = Object.keys(result).length - 1;
        this.userFiles = result;
      }, error => {
        console.log(error);
      },
    );
  };
}
