import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sdSalary'
})

export class SalaryPipe implements PipeTransform {
  transform(value: number): string {
    const formater =  new Intl.NumberFormat('en-US', {
      useGrouping: true,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return 'RUB' + formater.format(value);
  }
}

