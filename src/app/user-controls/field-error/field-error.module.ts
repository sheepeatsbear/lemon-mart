import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FieldErrorDirective } from './field-error.directive';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FieldErrorDirective],
  declarations: [FieldErrorDirective],
})
export class FieldErrorModule {}
