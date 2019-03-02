import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Media, TagReponse } from '../../interfaces/Media'

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  mediaAPI = 'http://media.mw.metropolia.fi/wbma/';

  constructor(public http: HttpClient) {
    console.log('Hello MediaProvider Provider');
  }

  getSingleMedia(id) {
    return this.http.get<Media>(this.mediaAPI + 'media/' + id);
  }

  getFilesByTag(tag: string) {
    return this.http.get<TagReponse[]>(this.mediaAPI + 'tags/' + tag);
  }
}
