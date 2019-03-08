import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Media, TagReponse, User } from '../../interfaces/Media'

@Injectable()
export class MediaProvider {

  mediaAPI = 'http://media.mw.metropolia.fi/wbma/';

  constructor (public http: HttpClient) {
    console.log('Hello MediaProvider Provider')
  }

  getSingleMedia (id) {
    return this.http.get<Media>(this.mediaAPI + 'media/' + id)
  }

  getFilesByTag (tag: string) {
    return this.http.get<TagReponse[]>(this.mediaAPI + 'tags/' + tag)
  }

  requestUserInfo(id: number) {
    const httpOtions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      }),
    };
    return this.http.get<User>(this.mediaAPI + 'users/' + id,
      httpOtions);
  }
}
