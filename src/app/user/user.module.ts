import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule } from '../app-material.module';
import { AuthGuard } from '../auth/auth-guard.service';
import { SharedComponentsModule } from '../shared-components.module';
import { FieldErrorModule } from '../user-controls/field-error/field-error.module';
import { LemonRaterModule } from '../user-controls/lemon-rater/lemon-rater.module';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { UserMaterialModule } from './user-material.module';
import { UserRoutingModule } from './user-routing.module';
import { UserResolve } from './user/user.resolve';

@NgModule({
  declarations: [ProfileComponent, LogoutComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    UserMaterialModule,
    AppMaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FieldErrorModule,
    LemonRaterModule,
    SharedComponentsModule,
  ],
  providers: [UserResolve, AuthGuard],
})
export class UserModule {}
