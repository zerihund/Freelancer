import { Pipe, PipeTransform } from '@angular/core'
import { JobProvider } from '../../providers/job/job'

@Pipe({
  name: 'thumbnail',
})
export class ThumbnailPipe implements PipeTransform {

  constructor (
    private jobProvider: JobProvider,
  ) {
  }

  url = 'https://media.mw.metropolia.fi/wbma/uploads/';

  transform(id: number, ...args) {
    if (id === null) return;
    return new Promise((resolve, reject) => {
        this.jobProvider.getSingleJob(id).subscribe((response) => {
            if(response.thumbnails === undefined) {
              resolve('https://www.daimto.com/wp-content/uploads/2014/08/errorstop.png')
            }else{
              switch (args[0]) {
                case 'small':
                  resolve(this.url + response.thumbnails['w160']);
                  break;
                case 'large':
                  resolve(this.url + response.thumbnails['w640']);
                  break;
                case 'medium':
                  resolve(this.url + response.thumbnails['w320']);
                  break;
                case 'screenshot':
                  resolve(this.url + response.screenshot);
                  break;
                default:
                  resolve(this.url + response.thumbnails['w160']);
              }
            }
          },
          error => {
            console.log(error);
          },
        );
      },
    );
  }
}
