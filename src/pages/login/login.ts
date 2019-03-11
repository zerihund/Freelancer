import {Component, ViewChild} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {HomePage} from '../home/home';
import {SignupPage} from '../signup/signup';
import {UserProvider} from "../../providers/user/user";
import {LoginResponse, User} from '../../interfaces/Media';
import {NgForm} from "@angular/forms";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  @ViewChild('lf') loginForm: NgForm;
  user: User = {username: null};

  constructor(public navCtrl: NavController, private userProvider: UserProvider, private alertController: AlertController) {
  }

  login() {
    this.userProvider.login(this.user).subscribe(
      (response: LoginResponse) => {
        console.log(response);
        this.userProvider.loggedIn = true;
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
    alert.present().catch();
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
