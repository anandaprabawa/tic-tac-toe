import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hideBoardKey',
})
export class HideBoardKeyPipe implements PipeTransform {
  transform(value: number | string): string {
    if (typeof value === 'number') {
      return '';
    }

    return value;
  }
}
