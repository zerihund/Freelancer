import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { JobInfoPage } from '../job-info/job-info';
import { SignupPage } from '../signup/signup';
import {UserProvider} from "../../providers/user/user";
import {LoginResponse, RegisterResponse, User} from '../../interfaces/Media';
import {NewPostPage} from "../new-post/new-post";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  constructor(public navCtrl: NavController, private mediaProvider:UserProvider) {
  }

  user: User = { username: null };

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
      });
  }

  // go to sign up page
  goSignUp() {
    this.navCtrl.push(SignupPage).catch();
  }

  // go to home page
  goHome(){
    this.navCtrl.pop();
  }

}
