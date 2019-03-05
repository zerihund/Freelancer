import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { User } from '../../interfaces/Media';

@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  mediaFilePath = 'http://media.mw.metropolia.fi/wbma/uploads/';
  user: User;
  private avatar: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
    // gets current user object passed from profile page
    this.user = this.navParams.get('user');
    console.log('user: ')
    console.log(this.user);
    console.log(typeof this.user);
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter EditProfilePage');
    this.avatar = this.navParams.get('avatar');
    console.log('avatar: ');
    console.log(this.avatar);

  }

}
