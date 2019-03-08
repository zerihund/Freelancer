import { Pipe, PipeTransform } from '@angular/core';
import { TagReponse } from '../../interfaces/Media';
import { JobProvider } from '../../providers/job/job';

@Pipe({
  name: 'avatarId',
})
export class AvatarIdPipe implements PipeTransform {

  constructor(
    private jobProvider: JobProvider,
  ) {
  }

  transform(value: number, ...args) {
    if (value === null) return;
    return new Promise((resolve) => {
      this.jobProvider.getFilesByTag('profile_freelancer').subscribe(
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
    });
  }
}
