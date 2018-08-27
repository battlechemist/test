import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';

import { IEmployee } from '../../models/employee.model';
import { EmployeesService } from '../../services/employees.service';
import { IType } from '../../models/type.model';

@Component({
  selector: 'sd-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit, OnDestroy {

  @Input() employee: IEmployee;
  @Input() userType: string;
  @Input() employmentTypes: IType[];

  @Output() editModalIsOpen = new EventEmitter();

  deleteFormIsVisible = false;
  delay = false;

  sub1: Subscription;

  constructor(private employeesService: EmployeesService) { }

  ngOnInit() {
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
      this.employeesService.writeDownDelete(this.employee.id);
    }
    if (!this.delay) {
      this.closeModal();
    }
  }

  openEditModal() {
    this.editModalIsOpen.emit(this.employee.id);
  }

  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
}
