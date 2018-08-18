import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SystemComponent } from './system.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesService } from '../shared/services/employees.service';
import { DataService } from '../shared/services/data.service';
import { SalaryPipe } from '../shared/pipes/salary.pipe';
import { AgePipe } from '../shared/pipes/age.pipe';
import { SystemFormComponent } from './system-form/system-form.component';
import { DeleteConfirmFormComponent } from './employee/delete-confirm-form/delete-confirm-form.component';
import { LoaderComponent } from '../shared/components/loader-component/loader.component';
import { DropdownDirective } from '../shared/directives/dropdown.directive';
import { FilterPipe } from '../shared/pipes/filter.pipe';

@NgModule ({
  declarations: [
    SystemComponent,
    EmployeeComponent,
    SystemFormComponent,
    DeleteConfirmFormComponent,
    LoaderComponent,
    SalaryPipe,
    AgePipe,
    FilterPipe,
    DropdownDirective
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers: [EmployeesService, DataService]
})

export class SystemModule {}
