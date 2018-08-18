import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/internal/operators';

import {IEmployee} from '../models/employee.model';

@Injectable()
export class EmployeesService {

  url = 'http://localhost:3000/employees';

  constructor(private httpClient: HttpClient) {}

  getEmployees(): Observable<IEmployee[]> {
    return this.httpClient.get<IEmployee[]>(this.url);
  }

  createNewEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.httpClient.post<IEmployee>(this.url, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.httpClient.delete(this.url + `/${id}`);
  }

  editEmployee(employee: IEmployee, id: number): Observable<IEmployee> {
    return this.httpClient.put<IEmployee>(this.url + `/${id}`, employee);
  }
}
