import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// @ts-ignore
import {
  LoginResponse, Media,
  RegisterResponse,
  User,
  UserExists,
} from '../../interfaces/Media';

@Injectable()
export class UserProvider {
  mediaAPI = 'http://media.mw.metropolia.fi/wbma/';
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

  checkUser(username) {
    return this.http.get<UserExists>(
      this.mediaAPI + 'users/username/' + username);
  }

  // request user info
  requestUserInfo = (user_id) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.get<User>(this.mediaAPI + 'users/' + user_id, httpOptions);
  };

  // Modifies profile image info
  updateAvatarInfo(data: Object, avatarId: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
        'Content-type': 'application/json',
      }),
    };
    return this.http.put(this.mediaAPI + 'media/' + avatarId, data,
      httpOptions);
  }

  // Modifies user information
  updateUserInfo(data: Object) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
        'Content-type': 'application/json',
      }),
    };
    return this.http.put(this.mediaAPI + 'users/', data, httpOptions);
  }

  // Fetches profile image
  getProfileImage (id: number) {
    return this.http.get<Media>(this.mediaAPI + 'media/' + id)
  }
}
