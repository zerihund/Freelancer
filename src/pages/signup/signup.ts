import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import {
  LoginResponse,
  RegisterResponse,
  User,
  UserExists,
} from '../../interfaces/Media';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  userAlert = false;
  usernameInput;
  passwordMatch;
  user: User = {
    username: '',
    full_name: '',
    email: '',
    password: ''
  };
  confirmPassword = '';
  validUsername = false;
  validFullName = false;
  validPassword = false;
  validEmail = false;

  constructor(
    public navCtrl: NavController, private mediaProvider: UserProvider) {
  }

  registerUser() {
    this.mediaProvider.registerUser(this.user).subscribe(
      (response: RegisterResponse) => {
        console.log(response);
        // log user in
        this.mediaProvider.login(this.user).subscribe(
          (response: LoginResponse) => {
            this.mediaProvider.loggedIn = true;
            // store user values in local storage
            localStorage.setItem('user', JSON.stringify(response));
            localStorage.setItem('token', response.token);
            localStorage.setItem('username', response.user.username);
            localStorage.setItem('email', response.user.email);
            localStorage.setItem('user_id', String(response.user.user_id));
            // navigate to home page
            this.navCtrl.parent.select(1);
            this.user = {
              username: '',
              full_name: '',
              email: '',
              password: ''
            };
            this.confirmPassword = '';
          },
          error => {
            console.log(error);
          });
      },
      error => {
        console.log(error);
      });
  }

  validName() {
    const pattern = /[a-zA-z]$/;
    this.validFullName = !pattern.test(this.user.full_name);
  }

  checkUserExists() {
    this.mediaProvider.checkUser(this.user.username).
      subscribe((data: UserExists) => {
        console.log(data.available);
        if (!data.available) {
          this.userAlert = true;
          this.usernameInput = true;
          // this.showAlert('The user already exists');
        } else {
          this.userAlert = false;
          this.usernameInput = false;
        }
      });
    this.validUsername = this.user.username.length < 3;
  }

  emailCheck() {
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    this.validEmail = this.user.email.length < 5 ||
      !pattern.test(this.user.email);
  }

  passwordCheck() {
    this.validPassword = this.user.password.length < 5;
  }

  passWordMatch() {
    this.passwordMatch = this.user.password !== this.confirmPassword;
  }

  goToLogin() {
    this.navCtrl.pop().catch();
  }
}
