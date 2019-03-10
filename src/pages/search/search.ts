import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  searchFiles;

  ionViewDidLoad() {
    this.searchFiles = this.navParams.get('searchFiles');
  }

  // parse description json
  getDescription = (description) => {
    return JSON.parse(description);
  };

}
