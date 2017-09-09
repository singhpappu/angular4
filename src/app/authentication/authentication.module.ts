import { NgModule } from '@angular/core';

import { P404Component } from './404/404.component';
import { P500Component } from './500/500.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginService } from './login/login.service';
import { LoginModule } from './login/login.module';

@NgModule({
  imports: [ 
    AuthenticationRoutingModule,
    LoginModule
  ],
  declarations: [
    P404Component,
    P500Component,
    RegisterComponent
  ],  
})
export class AuthenticationModule { }
