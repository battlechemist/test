import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IType } from '../models/type.model';

@Injectable()

export class EmploymentTypesService {

  private url = 'http://localhost:3000/employment-types';

  employmentTypes: IType[];


  constructor(private httpClient: HttpClient) {}

  getEmploymentTypes(): Observable<IType[]> {
    return this.httpClient.get<IType[]>(this.url);
  }

  setEmploymentTypes(data: IType[]) {
    this.employmentTypes = data;
  }

}
