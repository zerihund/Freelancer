import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// @ts-ignore
import {LoginResponse, RegisterResponse, User, UserExists} from '../../interfaces/Media';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  mediaAPI = 'http://media.mw.metropolia.fi/wbma/';
  imageUrl ='http://media.mw.metropolia.fi/wbma/uploads/';
  loggedIn = false;

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }
  login(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this.http.post<LoginResponse>(this.mediaAPI + 'login',
      user, httpOptions);
  }

  registerUser(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      }),
    };
    return this.http.post<RegisterResponse>(this.mediaAPI + 'users',
      user, httpOptions);
  }
  checkUser(username){
    return this.http.get<UserExists>(this.mediaAPI +'users/username/' + username);
  }
}
