import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { JobProvider } from '../../providers/job/job';
import { AlertController } from 'ionic-angular';
import { TagReponse } from '../../interfaces/Media';
import { ModalController } from 'ionic-angular';
import { OnMapPage } from '../on-map/on-map';
import { SentOffersPage } from '../sent-offers/sent-offers';

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
    public modalCtrl: ModalController,
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
    console.log(localStorage.getItem('token'));
    const bid = {
      file_id: this.job.file_id,
      comment: JSON.stringify(comment),
    };
    this.jobProvider.bidJob(bid).subscribe(res => {
      console.log(res);
      this.showAlert('Bidding successfully');
      this.goToHome();
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
      title: 'NOTICE',
      subTitle: notice,
      buttons: ['OK'],
    });
    alert.present().catch();
  };

  openMap() {
    this.navCtrl.push(OnMapPage).catch();
  }
}
