import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay } from 'rxjs/internal/operators';

import { IEmployee } from '../models/employee.model';
import { environment } from '../../environments/environment';

@Injectable()
export class EmployeesService {

  url: string = environment.apiUrlEmpl;

  private employees: IEmployee[] = [];
  private employeesChange$ = new BehaviorSubject(null);

  private isLoaded = false;
  private modalWindowIsVisible = false;

  constructor(private httpClient: HttpClient) {}

  getIsLoaded() {
    return this.isLoaded;
  }

  changeIsLoaded() {
    this.isLoaded = !this.isLoaded;
  }


  getModalWindowStatus() {
    return this.modalWindowIsVisible;
  }

  changeModalWindowStatus() {
    this.modalWindowIsVisible = !this.modalWindowIsVisible;
  }


  provideEmployees() {
    return this.employeesChange$.asObservable();
  }

  writeDownGet() {
    this.getEmployees()
      .subscribe((data: IEmployee[]) => {
      this.employees = data;
      this.doNext(this.employees);
      this.isLoaded = true;
      });
  }

  writeDownCreate(employee: IEmployee) {
    this.createNewEmployee(employee)
      .subscribe((data: IEmployee) => {
        this.employees.push(data);
        this.doNext(this.employees);
        this.changeModalWindowStatus();
      });
  }

  writeDownEdit(employee: IEmployee, id: number) {
    this.editEmployee(employee, id)
      .subscribe((data: IEmployee) => {
        this.employees.forEach((e, index) => {
          if (e.id === data.id) {
            this.employees[index] = data;
            this.doNext(this.employees);
            return;
          }
        });
        this.changeModalWindowStatus();
      });
  }

  writeDownDelete(id: number) {
    this.deleteEmployee(id)
      .subscribe(() => {
        this.employees.forEach((e, index) => {
          if (e.id === id) {
            this.employees.splice(index, 1);
            this.doNext(this.employees);
          }
        });
      });
  }

  doNext(value) {
    this.employeesChange$.next(value);
  }

  getEmployees(): Observable<IEmployee[]> {
    return this.httpClient.get<IEmployee[]>(this.url)
      .pipe(delay(2000));
  }

  createNewEmployee(employee: IEmployee): Observable<IEmployee> {
    return this.httpClient.post<IEmployee>(this.url, employee)
      .pipe(delay(1200));
  }

  editEmployee(employee: IEmployee, id: number): Observable<IEmployee> {
    return this.httpClient.put<IEmployee>(this.url + `/${id}`, employee)
      .pipe(delay(1200));
  }

  deleteEmployee(id: number): Observable<any> {
    return this.httpClient.delete(this.url + `/${id}`)
      .pipe(delay(1200));
  }

}
