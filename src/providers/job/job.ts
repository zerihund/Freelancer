import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the JobProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class JobProvider {

  constructor(public http: HttpClient) {
    console.log('Hello JobProvider Provider');
  }

  // fetch all jobs with freelancer tag
  getAllJobs = () => {
    return this.http.get<any>('http://media.mw.metropolia.fi/wbma/tags/freelancer');
  };

  // fetch single job with media id
  getSingleJob = (id) => {
    return this.http.get<any>(`http://media.mw.metropolia.fi/wbma/media/${id}`);
  };

  // upload job to server
  upload = (data: any) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token')
      })
    };
    return this.http.post<any>('http://media.mw.metropolia.fi/wbma/media', data, httpOptions)
  };

  // attach tag to media file
  attachTag = (file_id) => {
    const param = {
      file_id: file_id,
      tag: 'freelancer'
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token')
      })
    };
    return this.http.post<Object>(`http://media.mw.metropolia.fi/wbma/tags/`, param, httpOptions);
  };

  // log user in
  logInUser = (user) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>('http://media.mw.metropolia.fi/wbma/login', user, httpOptions);
  };

}
