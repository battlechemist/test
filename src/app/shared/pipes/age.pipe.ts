import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sdAge'
})

export class AgePipe implements PipeTransform {
  transform(value: number): string {
    let a = (value / 10) % 1;
    a = Math.round(a * 10);

    if (a < 5 && a !== 0) {
      if (a === 1) {
        return value + ' год';
      } else {
        return value + ' года';
      }
    } else {
      return value + ' лет';
    }
  }
}


