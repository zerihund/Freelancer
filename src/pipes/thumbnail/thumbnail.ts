import { Pipe, PipeTransform } from '@angular/core'
import { Media } from '../../interfaces/Media'
import { MediaProvider } from '../../providers/media/media'

@Pipe({
  name: 'thumbnail',
})
export class ThumbnailPipe implements PipeTransform {

  constructor (
    private mediaProvider: MediaProvider,
  ) {
  }

  async transform (id: string, ...args) {
    return new Promise((resolve) => {
        this.mediaProvider.getSingleMedia(id).subscribe((response: Media) => {
            switch (args[0]) {
              case 'large':
                resolve(response.thumbnails['w640']);
                break;
              case 'medium':
                resolve(response.thumbnails['w320']);
                break;
              case 'screenshot':
                resolve(response.screenshot);
                break;
              default:
                resolve(response.thumbnails['w160'])
            }
          },
          error => {
            console.log(error)
          },
        )
      },
    )
  }
}
