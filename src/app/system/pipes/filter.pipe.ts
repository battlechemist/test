import { Pipe, PipeTransform } from '@angular/core';

import { EmploymentTypesService } from '../../services/employment-types.service';

@Pipe ({
  name: 'sdFilter'
})

export class FilterPipe implements PipeTransform {

  constructor(private employmentTypesService: EmploymentTypesService) {}

  transform(items: any, value: string, field: string): any {
    if (items.length === 0 || !value) {
      return items;
    }

    return items.filter((i) => {
      const t = Object.assign({}, i);
      if (field === 'typeOfEmployment') {
        const types = this.employmentTypesService.employmentTypes;
        t[field] = types[t[field] - 1].type;
      }

      if (!isNaN(t[field])) {
        t[field] += '';
      }

      return t[field].toLowerCase().indexOf(value.toLowerCase()) !== -1;
    });
  }
}
