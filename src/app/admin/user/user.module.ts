import { UserService } from './user.service';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerService } from '../../loader/spinner/spinner.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    UserComponent
  ],
  providers: [
    UserService,
    SpinnerService
  ]
})
export class UserModule { }
