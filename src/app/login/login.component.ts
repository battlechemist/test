import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {UsersService} from '../shared/services/users.service';
import {DataService} from '../shared/services/data.service';
import {AuthService} from '../shared/services/auth.service';
import {Message} from '../shared/models/message.model';
import {IUser} from '../shared/models/user.model';

@Component({
  selector: 'sd-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  charsCount = 4;

  message: Message;

  constructor(
    private usersService: UsersService,
    private dataService: DataService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.message = new Message('', '');

    this.form = new FormGroup({
      email: new FormControl(
        'admin@mail.ru',
        [Validators.required, Validators.email]
        ),
      password: new FormControl(
        '12345',
        [
          Validators.required,
          this.checkForLength.bind(this)
        ]
      )
    });
  }

  onSubmit() {
    const formData = this.form.value;

    this.usersService.getUserByEmail(formData.email)
      .subscribe((user: IUser) => {
        if (user) {
          if (user.password === formData.password) {
            this.authService.login();
            this.dataService.changeUser(user);
            window.localStorage.setItem('user', JSON.stringify(user));
            this.router.navigate(['/system']);
          } else {
            this.showMessage('Пароль не верный');
          }
        } else {
          this.showMessage('Такого пользователя не существует');
        }
      });
  }

  checkForLength(control: FormControl) {
    if (control.value.length < this.charsCount) {
      return {
        'lengthError': true
      };
    }
    return null;
  }

  private showMessage(
    text: string,
    type: string = 'danger'
  ) {
      this.message = new Message(type, text);
      window.setTimeout(() => {
        this.message.text = '';
      }, 5000);
  }
}
