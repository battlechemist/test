import {IUser} from '../models/user.model';


export class UserService {

  private user: IUser;

  changeUser(user: IUser): void {
    this.user = user;
  }

  getUser(): IUser {
    return this.user;
  }
}
