import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Media } from '../../interfaces/Media'

@Injectable()
export class JobProvider {

  constructor (public http: HttpClient) {
    console.log('Hello JobProvider Provider')
  }

  // fetch all jobs with freelancer tag
  getAllJobs = () => {
    return this.http.get<any>(
      'http://media.mw.metropolia.fi/wbma/tags/freelancer')
  };

  // fetch single job with media id
  getSingleJob = (id) => {
    return this.http.get<any>(`http://media.mw.metropolia.fi/wbma/media/${id}`)
  };

  // upload job to server
  upload = (data: any) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.post<any>('http://media.mw.metropolia.fi/wbma/media', data,
      httpOptions)
  };

  // attach "freelancer" tag to media file
  attachTag = (file_id: number, tag: string) => {
    const param = {
      file_id: file_id,
      tag: tag,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.post<Object>(`http://media.mw.metropolia.fi/wbma/tags/`,
      param, httpOptions)
  };

  // log user in
  logInUser = (user) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>('http://media.mw.metropolia.fi/wbma/login', user,
      httpOptions)
  };

  // bid job function
  bidJob = (bid) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.post<any>('http://media.mw.metropolia.fi/wbma/comments', bid, httpOptions)
  };

  // delete bid
  deleteBid = (id) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.delete<any>(`http://media.mw.metropolia.fi/wbma/comments/${id}`, httpOptions)
  };

  // delete job
  deleteJob = () => {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.delete<any>('http://media.mw.metropolia.fi/wbma/media/699', httpOptions)
  };

  // // generateDetailedJobs (job: Media) {
  // //   const jobObj = job;
  // //   jobObj.description = JSON.parse(job.description);
  // //   return jobObj
  //
  //   // TODO calculate number of bids
  // }

  // calculate number of bids
  getNumBid = (id) => {
    return this.http.get<any>(`http://media.mw.metropolia.fi/wbma/comments/file/${id}`)
  };

  // upload user avatar
  uploadAvatar(data: any){
      const httpOptions = {
        headers: new HttpHeaders({
          'x-access-token': localStorage.getItem('token'),
        }),
      };
    return this.http.post<any>('http://media.mw.metropolia.fi/wbma/media', data,
      httpOptions)
  };
}
