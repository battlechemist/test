import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/internal/operators';

import {IUser} from '../models/user.model';

@Injectable()

export class UsersService {
  constructor(private httpClient: HttpClient) {}

  getUserByEmail(email: string): Observable<IUser> {
    return this.httpClient.get(`http://localhost:3000/users?email=${email}`).
      pipe(map((user: IUser[]) => {
        return user[0] ? user[0] : undefined;
    }));
  }
}
