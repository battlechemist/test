import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { EmployeesService } from '../../services/employees.service';
import { IEmployee } from '../../models/employee.model';
import { EmploymentTypesService } from '../../services/employment-types.service';
import { IType } from '../../models/type.model';

@Component({
  selector: 'sd-system-form',
  templateUrl: './system-form.component.html',
  styleUrls: ['./system-form.component.css']
})
export class SystemFormComponent implements OnInit {

  @Input() editEmployee: IEmployee;

  @Output() formIsCanceled = new EventEmitter();

  employmentTypes: IType[];

  message = 'Добавление нового сотрудника';

  delay = false;

  form: FormGroup;

  charsCount = 255;
  bioCharsCount = 1000;

  constructor(private employeesService: EmployeesService,
              private employmentTypesService: EmploymentTypesService) { }


  ngOnInit() {
    if (this.editEmployee.id !== null) {
      this.message = 'Изменение данных о сотруднике';
    }

    this.employmentTypes = this.employmentTypesService.employmentTypes;

    this.form = new FormGroup({
      name: new FormControl(
        this.editEmployee.name,
        [Validators.required, Validators.maxLength(this.charsCount)]
      ),
      position: new FormControl(
        this.editEmployee.position,
        [Validators.maxLength(this.charsCount)]
      ),
      age: new FormControl(
        this.editEmployee.age,
        [Validators.required, Validators.min(0), this.isInteger.bind(this)]
      ),
      salary: new FormControl(
        this.editEmployee.salary,
        [Validators.required, Validators.min(0)]
      ),
      typeOfEmployment: new FormControl(
        this.editEmployee.typeOfEmployment,
        [Validators.required]
      ),
      bio: new FormControl(
        this.editEmployee.bio,
        Validators.maxLength(this.bioCharsCount)
      )
    });
  }

  cancelClickOn() {
    this.formIsCanceled.emit();
  }

  onSubmit() {
    this.delay = true;

    let {name, position, age, salary, typeOfEmployment, bio} = this.form.value;
    salary = +salary.toFixed(2);
    typeOfEmployment = +typeOfEmployment;
    const employee: IEmployee = {
      name: name,
      position: position,
      age: age,
      salary: salary,
      typeOfEmployment: typeOfEmployment,
      bio: bio
    };

    if (this.editEmployee.id === null) {
      this.employeesService.writeDownCreate(employee);
    } else {
      this.employeesService.writeDownEdit(employee, this.editEmployee.id);
    }
  }

  isInteger(control: FormControl) {
    if (control.value % 1 !== 0) {
      return {
        'integerError': true
      };
    }
    return null;
  }
  // Вариант валидатора для инпута зарплаты - не более 2-х знаков после запятой
  // isTwoChars(control: FormControl) {
  //   const a = Math.ceil((control.value * 100) % 1);
  //   console.log(a);
  //   if (a !== 0) {
  //     return {
  //       'twoCharsError': true
  //     };
  //   }
  //   return null;
  // }

}
