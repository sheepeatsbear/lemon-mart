import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseFormDirective } from 'src/app/common/base-form.class';
import { OneCharValidation, RequiredTextValidation } from 'src/app/common/validations';
import { ErrorSets } from 'src/app/user-controls/field-error/field-error.directive';

import { IName } from '../user/user';

@Component({
  selector: 'app-name-input',
  template: `<form [formGroup]="formGroup">
    <div fxLayout="row" fxLayout.lt-sm="column" fxLayoutGap="10px">
      <mat-form-field appearance="outline" fxFlex="40%">
        <mat-label>First Name</mat-label>
        <input matInput aria-label="First Name" formControlName="first" #first />
        <mat-error
          [input]="first"
          [group]="formGroup"
          [appFieldError]="ErrorSets.RequiredText">
        </mat-error>
      </mat-form-field>
      <mat-form-field appearance="outline" fxFlex="20%">
        <mat-label>MI</mat-label>
        <input matInput aria-label="Middle Initial" formControlName="middle" #mi />
        <mat-error
          [input]="mi"
          [group]="formGroup"
          [appFieldError]="{ error: 'invalid', message: 'Only initial' }">
        </mat-error>
      </mat-form-field>
      <mat-form-field appearance="outline" fxFlex="40%">
        <mat-label>Last Name</mat-label>
        <input matInput aria-label="Last Name" formControlName="last" #last />
        <mat-error
          [input]="last"
          [group]="formGroup"
          [appFieldError]="ErrorSets.RequiredText">
        </mat-error>
      </mat-form-field>
    </div>
  </form> `,
  styles: [],
})
export class NameInputComponent
  extends BaseFormDirective<IName>
  implements OnInit, OnChanges
{
  ErrorSets = ErrorSets;
  constructor(private formBuilder: FormBuilder) {
    super();
    this.formGroup = this.formBuilder.group({
      first: ['', RequiredTextValidation],
      middle: ['', OneCharValidation],
      last: ['', RequiredTextValidation],
    });
  }

  ngOnInit() {
    console.log(this.initialData);
    console.log(this.formGroup);

    this.formGroup = this.buildForm(this.initialData);

    if (this.disable) {
      this.formGroup.disable();
    }
    this.formReady.emit(this.formGroup);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.patchUpdatedDataIfChanged(changes);
  }

  buildForm(initialData: IName | null): FormGroup {
    const name = initialData;
    return this.formBuilder.group({
      first: [name?.first || '', RequiredTextValidation],
      middle: [name?.middle || '', OneCharValidation],
      last: [name?.last || '', RequiredTextValidation],
    });
  }
}
