import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { JobInfoPage } from '../job-info/job-info';
import {UserProvider} from "../../providers/user/user";
import {RegisterResponse, User, UserExists} from "../../interfaces/Media";
import {NewPostPage} from "../new-post/new-post";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  userAlert=false;
  usernameInput;
  passwordMatch;
  user: User = { username: null };
  confirmPassword = '';
  validUsername = false;
  validFullName = false;
  validPassword = false;
  validEmail =false;
  constructor(public navCtrl: NavController, private mediaProvider:UserProvider) {
  }

  registerUser() {
    this.mediaProvider.registerUser(this.user).subscribe(
      (response: RegisterResponse) => {
        console.log(response);
        this.mediaProvider.loggedIn = true;
        this.navCtrl.push(NewPostPage);
      },
      error => {
        console.log(error);
      });
  }
  validName(){
    const pattern = /[a-zA-z]$/;
    if(!pattern.test(this.user.full_name)){
      this.validFullName = true;
    }
    else{
      this.validFullName =false;
    }
  }
  checkUserExists() {
    this.mediaProvider.checkUser(this.user.username).subscribe((data: UserExists) => {
      console.log(data.available);
      if (!data.available) {
        this.userAlert = true;
        this.usernameInput = true;
        // this.showAlert('The user already exists');
      } else {
        this.userAlert = false;
        this.usernameInput =false;
      }
    });
    if(this.user.username.length<3){
      this.validUsername =true;
    }
    else{
      this.validUsername =false;
    }
  }
  emailCheck(){
    const pattern =/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if(this.user.email.length < 5 || !pattern.test(this.user.email)){
      this.validEmail = true;
    }
    else{
      this.validEmail =false;
    }
  }
  passwordCheck(){
    if(this.user.password.length<5){
      this.validPassword =true;
    }
    else{
      this.validPassword = false;
    }
  }
  passWordMatch() {
    if (this.user.password !== this.confirmPassword) {
      //this.showAlert('Password do not match!');
      this.passwordMatch = true;
    }else {
      this.passwordMatch =false;
    }
  }
}
