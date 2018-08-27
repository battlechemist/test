import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login.component';
import { SharedModule } from '../shared/shared.module';
import { UsersService } from '../services/users.service';

@NgModule ({
  declarations: [LoginComponent],
  imports: [CommonModule, SharedModule],
  providers: [UsersService]
})

export class LoginModule { }
