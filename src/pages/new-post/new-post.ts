import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UploadImagePage } from '../upload-image/upload-image';
import { HomePage } from '../home/home';
import { JobInfoPage } from '../job-info/job-info';

@Component({
  selector: 'page-new-post',
  templateUrl: 'new-post.html'
})
export class NewPostPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }
  goToUploadImage(params){
    if (!params) params = {};
    this.navCtrl.push(UploadImagePage);
  }goToNewPost(params){
    if (!params) params = {};
    this.navCtrl.push(NewPostPage);
  }goToHome(params){
    if (!params) params = {};
    this.navCtrl.push(HomePage);
  }goToJobInfo(params){
    if (!params) params = {};
    this.navCtrl.push(JobInfoPage);
  }
}
