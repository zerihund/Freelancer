import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Media, TagReponse, User } from '../../interfaces/Media';
import { SavedAddsPage } from '../saved-adds/saved-adds';
import { OwnJobsPage } from '../own-jobs/own-jobs';
import { SentOffersPage } from '../sent-offers/sent-offers';
import { MediaProvider } from '../../providers/media/media';
import { stringify } from 'querystring';
import { JobProvider } from '../../providers/job/job';
import { EditProfilePage } from '../edit-profile/edit-profile';

@Component({
  selector: 'page-my-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  mediaFilePath = 'http://media.mw.metropolia.fi/wbma/uploads/';
  private user: User;
  private username: string;
  private userId: number;
  private email: string;
  private projectFilesArray: TagReponse[];
  private userFilesArray: any;
  private profileImage: TagReponse;
  private avatar: string;
  private numberOfOwnJobs: number;
  private userFiles: any;

  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider,
    public mediaProvider: MediaProvider,
  ) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ionViewWillEnter() {
    if (this.user === null) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    console.log('username is: ');
    console.log(this.user.username);
    this.getProfileInfo();
  }

  // ========================
  //        Navigation
  // ========================
  goToSavedAdds(params) {
    if (!params) params = {};
    this.navCtrl.push(SavedAddsPage);
  }

  goToMyOwnJobs(files) {
    this.navCtrl.push(OwnJobsPage, {
      files: files,
      avatar: this.avatar,
    }).catch();
  }

  goToMySentOffers(params) {
    if (!params) params = {};
    this.navCtrl.push(SentOffersPage);
  }

  goToEditProfile(params) {
    this.navCtrl.push(EditProfilePage, {
      user: this.user,
      avatar: this.avatar,
    }).catch();
  }

  // ========================
  //        Functions
  // ========================
  logout() {
    localStorage.clear();
    this.userProvider.loggedIn = false;
    this.user = null;
    console.log('logout btn pressed');
    console.log(this.userProvider.loggedIn);
    this.navCtrl.parent.select(1);
  }

  getProfileInfo() {
    this.username = localStorage.getItem('username');
    this.userId = parseInt(localStorage.getItem('user_id'));
    this.email = localStorage.getItem('email');

    this.getProfileImage();
    this.getUserFiles();
  }

  private getProjectFiles() {
    this.mediaProvider.getFilesByTag('freelancer').subscribe(
      (response: TagReponse[]) => {
        this.projectFilesArray = response;
        console.log('User id in profile page = ' + this.user.user_id);
      },
    );
  }

  // get user files from all project files
  private getUserFilesFromProjectFiles() {
    this.getProjectFiles();
    this.userFilesArray = this.projectFilesArray.filter(file =>
      file.user_id === this.user.user_id,
    );
  }

  private getProfileImage() {
    this.mediaProvider.getFilesByTag('profile_freelancer').subscribe(
      (response: TagReponse[]) => {
        response.forEach(file => {
          if (file.user_id === this.user.user_id) {
            this.profileImage = file;
            this.avatar = file.file_id.toString();
            console.log('Avatar id: ' + this.avatar);
          }
        });
      },
      error => {
        console.log(error);
      },
    );
  }

  private getUserFiles() {
    new Promise((resolve, reject) => {
      this.mediaProvider.getFilesByUserId(this.user.user_id).subscribe(
        result => {
          this.userFilesArray = result;
          this.numberOfOwnJobs = Object.keys(result).length;
          resolve(result);
          console.log(
            'Number of own jobs: ' + (Object.keys(result).length));
        }, error => {
          console.log(error);
        },
      );
    }).then(
      result => {
        this.userFiles = result;
      },
    );
  }

}
