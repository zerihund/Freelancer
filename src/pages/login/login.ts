import {Component, ViewChild} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {JobInfoPage} from '../job-info/job-info';
import {SignupPage} from '../signup/signup';
import {UserProvider} from "../../providers/user/user";
import {LoginResponse, RegisterResponse, User} from '../../interfaces/Media';
import {NewPostPage} from "../new-post/new-post";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild('lf') loginForm: NgForm;
  user: User = {username: null};
  tokenExist;

  constructor(public navCtrl: NavController, private mediaProvider: UserProvider, private alertController: AlertController) {
  }

  ionViewWillEnter() {
    /*this.mediaProvider.login(this.user).subscribe((res)=>{
      this.tokenExist=localStorage.setItem('token',res.token);
    });
  if(this.tokenExist){
    this.mediaProvider.loggedIn=true;
    this.navCtrl.parent.select(1);
  }*/
  }

  login() {
    this.mediaProvider.login(this.user).subscribe(
      (response: LoginResponse) => {
        console.log(response);
        this.mediaProvider.loggedIn = true;
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        localStorage.setItem('username', response.user.username);
        localStorage.setItem('email', response.user.email);
        localStorage.setItem('user_id', String(response.user.user_id));
        console.log('UserId');
        console.log(localStorage.getItem('user_id'));
        this.navCtrl.parent.select(1);

      },
      error => {
        console.log(error);
        this.showAlert();
      });
  }

  showAlert = () => {
    let alert = this.alertController.create({
      subTitle: 'Wrong username or password, Please try again!',
      buttons: ['OK'],
      cssClass: 'alertCustomCss'
    });
    alert.present();
  };

  // go to sign up page
  goSignUp() {
    this.navCtrl.push(SignupPage).catch();
  }

  // go to home page
  goHome() {
    this.navCtrl.popTo(HomePage).catch();
  }

}
