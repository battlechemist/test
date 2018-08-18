import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/internal/operators';

import { IUser} from '../shared/models/user.model';
import { AuthService } from '../shared/services/auth.service';
import { DataService } from '../shared/services/data.service';
import { EmployeesService } from '../shared/services/employees.service';
import { IEmployee } from '../shared/models/employee.model';

@Component({
  selector: 'sd-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.css']
})
export class SystemComponent implements OnInit, OnDestroy {

  user: IUser;
  employees: IEmployee[] = [];

  editEmployee: IEmployee;

  searchValue = '';
  searchPlaceholder = 'Фамилия';
  searchField = 'name';

  userMap = {
    admin: 'Администратор',
    user: 'Пользователь'
  };

  isLoaded = false;
  modalWindowIsVisible = false;

  sub1: Subscription;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private employeesService: EmployeesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getEmployees();
    this.getUser();
  }

  openModal(data: number) {
    if (data !== -1) {
      this.editEmployee = this.employees[data];
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
    this.modalWindowIsVisible = true;
  }

  closeModal() {
    this.modalWindowIsVisible = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getEmployees() {
    this.sub1 = this.employeesService.getEmployees()
      .pipe(delay(2000))
      .subscribe((data: IEmployee[]) => {
        this.employees = data;
        this.isLoaded = true;
      });
  }

  getUser() {
    this.user = this.dataService.getUser();
  }

  onSubmit() {
    this.isLoaded = false;
    this.closeModal();
    this.getEmployees();
  }

  onDelete() {
    this.isLoaded = false;
    this.getEmployees();
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
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}

