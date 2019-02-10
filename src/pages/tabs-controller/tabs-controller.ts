import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';
import { NewPostPage } from '../new-post/new-post';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = ProfilePage;
  tab2Root: any = HomePage;
  tab3Root: any = NewPostPage;
  constructor(public navCtrl: NavController) {
  }
  
}
