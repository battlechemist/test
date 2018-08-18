import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/internal/operators';

import { IEmployee } from '../../shared/models/employee.model';
import { EmployeesService } from '../../shared/services/employees.service';
import { TypeModel } from '../../shared/models/type.model';

@Component({
  selector: 'sd-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit, OnDestroy {

  @Input() employee: IEmployee;
  @Input() userType: string;

  @Output() employeeIsDeleted = new EventEmitter();
  @Output() editModalIsOpen = new EventEmitter();

  deleteFormIsVisible = false;
  delay = false;

  // typeMap = ['полная', 'частичная', 'временная'];
  employmentTypes = TypeModel;
  typeMap = [];

  sub1: Subscription;

  constructor(private employeesService: EmployeesService) { }

  ngOnInit() {
    if (this.employee.position === '') {
      this.employee.position = '*не задано*';
    }
  }

  openModal() {
    this.deleteFormIsVisible = true;
  }

  closeModal() {
    this.deleteFormIsVisible = false;
  }

  onSubmit(data: boolean) {
    if (data === true) {
      this.delay = true;
      this.sub1 = this.employeesService.deleteEmployee(this.employee.id)
        .pipe(delay(500))
        .subscribe(() => {
          this.delay = false;
          this.employeeIsDeleted.emit();
        });
    }
    if (!this.delay) {
      this.closeModal();
    }
  }

  openEditModal() {
    this.editModalIsOpen.emit(this.employee.id - 1);
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
