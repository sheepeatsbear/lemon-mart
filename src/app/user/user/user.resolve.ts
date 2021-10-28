import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { transformError } from 'src/app/common/common';

import { IUser, User } from './user';
import { UserService } from './user.service';

@Injectable()
export class UserResolve implements Resolve<IUser> {
  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot): IUser | Observable<IUser> | Promise<IUser> {
    return this.userService
      .getUser(route.paramMap.get('userId')!)
      .pipe(map(User.Build), catchError(transformError));
  }
}
