import {Injectable} from '@angular/core';

import {IUser} from '../models/user.model';

@Injectable()

export class DataService {

  private user: IUser;

  changeUser(user: IUser): void {
    this.user = user;
  }

  getUser(): IUser {
    return this.user;
  }
}
