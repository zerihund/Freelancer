import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'acceptTitle',
})
export class AcceptTitlePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    const lastIndex = value.lastIndexOf('_');
    return value.substring(0, lastIndex);
  }
}
