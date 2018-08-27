import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sdPosition'
})

export class PositionPipe implements PipeTransform {
  transform(value: string): string {
    if (value === '') {
      return '*не задано*';
    }
    return value;
  }
}

