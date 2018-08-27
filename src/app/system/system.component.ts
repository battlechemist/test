import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { IUser} from '../models/user.model';
import { UserService } from '../services/user.service';
import { EmployeesService } from '../services/employees.service';
import { IEmployee } from '../models/employee.model';
import { IType } from '../models/type.model';
import { EmploymentTypesService } from '../services/employment-types.service';

@Component({
  selector: 'sd-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit, OnDestroy {

  user: IUser;
  employees: IEmployee[] = [];
  employmentTypes: IType[];

  editEmployee: IEmployee;

  searchValue = '';
  searchPlaceholder = 'Фамилия';
  searchField = 'name';

  userMap = {
    admin: 'Администратор',
    user: 'Пользователь'
  };

  sub2: Subscription;

  constructor(
    private userService: UserService,
    private employeesService: EmployeesService,
    private employmentTypesService: EmploymentTypesService,
    private router: Router
  ) { }

  sub: Subscription = this.employeesService.provideEmployees()
    .subscribe((data: IEmployee[]) => {
      this.employees = data;
    });

  ngOnInit() {
    this.getUser();
    this.employeesService.writeDownGet();
    this.getEmploymentTypes();
  }

  getIsLoaded() {
    return this.employeesService.getIsLoaded();
  }

  getModalWindowStatus() {
    return this.employeesService.getModalWindowStatus();
  }

  openModal(data: number) {
    // Как вариант, можно передавать весь объект employee, тогда можно обойтись без
    // без фильтрации массива
    if (data !== -1) {
      this.editEmployee = this.employees.filter((e) => {
        return e.id === data;
      })[0];
    } else {
      this.editEmployee = {
        id: null,
        name: '',
        position: '',
        age: null,
        salary: null,
        typeOfEmployment: null,
        bio: ''
      };
    }
    this.employeesService.changeModalWindowStatus();
  }

  closeModal() {
    this.employeesService.changeModalWindowStatus();
  }

  logout() {
    this.employeesService.changeIsLoaded();
    this.router.navigate(['/login']);
  }

  getEmploymentTypes() {
    this.sub2 = this.employmentTypesService.getEmploymentTypes()
      .subscribe((data: IType[]) => {
        this.employmentTypesService.setEmploymentTypes(data);
        this.employmentTypes = data;
      });
  }

  getUser() {
    this.user = this.userService.getUser();
  }

  changeCriteria(field: string) {
    const namesMap = {
      name: 'Фамилия',
      position: 'Должность',
      age: 'Возраст',
      salary: 'Зарплата',
      typeOfEmployment: 'Тип занятости'
    };
    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }

  }

}

