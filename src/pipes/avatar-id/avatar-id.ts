import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';
import { TagReponse } from '../../interfaces/Media';

@Pipe({
  name: 'avatarId',
})
export class AvatarIdPipe implements PipeTransform {

  constructor(
    private mediaProvider: MediaProvider,
  ) {
  }

  transform(value: number, ...args) {
    if(value === null) return;
    return new Promise((resolve) => {
      this.mediaProvider.getFilesByTag('profile_freelancer').subscribe(
        (response: TagReponse[]) => {
          response.forEach(file => {
            if (file.user_id === value) {
              console.log(file);
              resolve(file.file_id);
            }
          });
        },
        error => {
          console.log(error);
        },
      );
    })
  }
}
