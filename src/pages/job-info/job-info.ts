import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JobProvider } from '../../providers/job/job';
import { AlertController } from 'ionic-angular';
import { TagReponse } from '../../interfaces/Media';
import { OnMapPage } from '../on-map/on-map';

@Component({
  selector: 'page-job-info',
  templateUrl: 'job-info.html',
})
export class JobInfoPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public jobProvider: JobProvider,
    private alertController: AlertController,
  ) {
    this.job = this.navParams.get('job');
    this.getProfileImage();
    this.descriptionJSON = this.getDescription(this.job.description);
    this.userInfoJSON = this.getUser(this.descriptionJSON.user);
  }

  job;
  descriptionJSON;
  userInfoJSON;
  priceOffer = 500;
  comment = '';
  avatar: string;
  isOffered = false;

  // parse description json
  getDescription = (description) => {
    return JSON.parse(description);
  };

  // parse user json
  getUser = (user) => {
    return JSON.parse(user);
  };

  // got to home page
  goToHome = () => {
    this.navCtrl.pop().catch();
  };

  // send offer to server
  goToSendOffer = () => {
    const comment = {
      user_id: localStorage.getItem('user_id'),
      price: this.priceOffer,
      comment: this.comment,
    };
    const bid = {
      file_id: this.job.file_id,
      comment: JSON.stringify(comment),
    };
    this.jobProvider.checkBid(this.job.file_id).subscribe(res => {
      res.forEach(item => {
        if (item.user_id === parseInt(comment.user_id)) {
          this.showAlert('You have already offered to this job!');
          this.isOffered = true;
        }
      });
      if (!this.isOffered) {
        this.jobProvider.bidJob(bid).subscribe(res => {
          console.log(res);
          this.showAlert('You bid has been sent');
          this.goToHome();
        });
      }
    });
  };

  // get user avatar
  getProfileImage = () => {
    this.jobProvider.getFilesByTag('profile_freelancer').subscribe(
      (response: TagReponse[]) => {
        response.forEach(file => {
          if (file.user_id === this.job.user_id) {
            this.avatar = file.file_id.toString();
          }
        });
      },
      error => {
        console.log(error);
      },
    );
  };

  // showing alert when bidding successfully
  showAlert = (notice: string) => {
    let alert = this.alertController.create({
      subTitle: notice,
      buttons: ['OK'],
      cssClass: 'alertCustomCss',
    });
    alert.present().catch();
  };

  openMap() {
    this.navCtrl.push(OnMapPage, {address: this.descriptionJSON.place}).catch();
  }
}
