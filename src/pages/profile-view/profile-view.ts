import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-profile-view',
  templateUrl: 'profile-view.html'
})
export class ProfileViewPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  constructor(public navCtrl: NavController) {
  }

}
