import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {UsersService} from '../services/users.service';
import {UserService} from '../services/user.service';
import {Message} from '../models/message.model';
import {IUser} from '../models/user.model';

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
    private userService: UserService,
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
          Validators.minLength(this.charsCount)
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
            this.userService.changeUser(user);
            this.router.navigate(['/system']);
          } else {
            this.showMessage('Пароль не верный');
          }
        } else {
          this.showMessage('Такого пользователя не существует');
        }
      });
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
