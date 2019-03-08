import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Media, TagReponse } from '../../interfaces/Media';

@Injectable()
export class JobProvider {

  constructor(public http: HttpClient) {
    console.log('Hello JobProvider Provider');
  }

  // fetch all jobs with tag
  getFilesByTag = (tag: string) => {
    return this.http.get<TagReponse[]>('http://media.mw.metropolia.fi/wbma/tags/' + tag)
  };

  // fetch single job with media id
  getSingleJob = (id) => {
    return this.http.get<any>(`http://media.mw.metropolia.fi/wbma/media/${id}`);
  };

  // upload job to server
  upload = (data: any) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.post<any>('http://media.mw.metropolia.fi/wbma/media', data,
      httpOptions);
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
      param, httpOptions);
  };

  // log user in
  logInUser = (user) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<any>('http://media.mw.metropolia.fi/wbma/login', user,
      httpOptions);
  };

  // bid job function
  bidJob = (bid) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.post<any>('http://media.mw.metropolia.fi/wbma/comments',
      bid, httpOptions);
  };

  // delete bid
  deleteBid = (id) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.delete<any>(
      `http://media.mw.metropolia.fi/wbma/comments/${id}`, httpOptions);
  };

  // delete job
  deleteJob = () => {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.delete<any>('http://media.mw.metropolia.fi/wbma/media/699',
      httpOptions);
  };

  // calculate number of bids
  getNumBid = (id) => {
    return this.http.get<any>(
      `http://media.mw.metropolia.fi/wbma/comments/file/${id}`);
  };

  // upload user avatar
  uploadAvatar(data: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.post<any>('http://media.mw.metropolia.fi/wbma/media', data,
      httpOptions);
  };

  // accept offer (updating job's title)
  acceptOffer = (file_id, json) => {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.put<any>('http://media.mw.metropolia.fi/wbma/media/' + file_id, json,
      httpOptions);
  };

  // get jobs by user's id
  getJobByUserId (id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.get<Media[]>('http://media.mw.metropolia.fi/wbma/media/user/' + id,
      httpOptions)
  }
}
