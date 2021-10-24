import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Role } from 'src/app/auth/auth.enum';
import { AuthService } from 'src/app/auth/auth.service';
import { UiService } from 'src/app/common/ui.service';
import {
  EmailValidation,
  OneCharValidaton,
  OptionalTextValidation,
  RequiredTextValidation,
  USAZipCodeValidation,
} from 'src/app/common/validations';
import { $enum } from 'ts-enum-util';

import { IUser, PhoneType } from '../user/user';
import { UserService } from '../user/user.service';
import { IUSState } from './data';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  Role = Role;
  PhoneType = PhoneType;
  PhoneTypes = $enum(PhoneType).getKeys();
  formGroup!: FormGroup;
  states$: Observable<IUSState[]> | undefined;
  userError = '';
  currentUserId!: string;

  constructor(
    private formBuilder: FormBuilder,
    private uiService: UiService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.authService.currentUser$
      .pipe(
        filter((user) => user !== null),
        tap((user) => {
          this.currentUserId = user._id;
          this.buildForm(user);
        })
      )
      .subscribe();
  }
  private get currentUserRole() {
    return this.authService.authStatus$.value.userRole;
  }

  buildForm(user?: IUser) {
    this.formGroup = this.formBuilder.group({
      email: [
        {
          value: user?.email || '',
          disabled: this.currentUserRole !== Role.Manager,
        },
        EmailValidation,
      ],
      name: this.formBuilder.group({
        first: [user?.name?.first || '', RequiredTextValidation],
        middle: [user?.name?.middle || '', OneCharValidaton],
        last: [user?.name?.last || '', RequiredTextValidation],
      }),
      role: [
        {
          value: user?.role || '',
          disabled: this.currentUserRole !== Role.Manager,
        },
        [Validators.required],
      ],
      dateOfBirth: [user?.dateOfBirth || '', Validators.required],
      address: this.formBuilder.group({
        line1: [user?.address?.line1 || '', RequiredTextValidation],
        line2: [user?.address?.line2 || '', OptionalTextValidation],
        city: [user?.address?.city || '', RequiredTextValidation],
        state: [user?.address?.state || '', RequiredTextValidation],
        zip: [user?.address?.zip || '', USAZipCodeValidation],
      }),
    });
  }
}
