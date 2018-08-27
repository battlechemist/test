import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemComponent } from './system.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesService } from '../services/employees.service';
import { UserService } from '../services/user.service';
import { SalaryPipe } from './pipes/salary.pipe';
import { AgePipe } from './pipes/age.pipe';
import { SystemFormComponent } from './system-form/system-form.component';
import { DeleteConfirmFormComponent } from './employee/delete-confirm-form/delete-confirm-form.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SharedModule } from '../shared/shared.module';
import { PositionPipe } from './pipes/position.pipe';
import { EmploymentTypesService } from '../services/employment-types.service';

@NgModule ({
  declarations: [
    SystemComponent,
    EmployeeComponent,
    SystemFormComponent,
    DeleteConfirmFormComponent,
    SalaryPipe,
    AgePipe,
    FilterPipe,
    PositionPipe
  ],
  imports: [CommonModule, SharedModule],
  providers: [EmployeesService, UserService, EmploymentTypesService]
})

export class SystemModule {}
