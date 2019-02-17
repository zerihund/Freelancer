import { HttpClient } from '@angular/common/http';
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

  getAllJobs = () => {
    return this.http.get<any>('http://media.mw.metropolia.fi/wbma/tags/freelancer');
  };

  getSingleJob = (id) => {
    return this.http.get<any>(`http://media.mw.metropolia.fi/wbma/media/${id}`);
  };

}
