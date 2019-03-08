import { Pipe, PipeTransform } from '@angular/core';
import { JobProvider } from '../../providers/job/job';

@Pipe({
  name: 'bidnumber',
})
export class BidnumberPipe implements PipeTransform {

  constructor(
    private jobProvider: JobProvider,
  ) {
  }

  transform(value: string, ...args) {
    return new Promise((resolve) => {
        this.jobProvider.getNumBid(value).subscribe(res => {
          resolve(res.length)
        });
      },
    );
  }
}
