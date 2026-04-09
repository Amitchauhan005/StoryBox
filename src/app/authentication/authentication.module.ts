import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [CommonModule,AuthenticationRoutingModule,ReactiveFormsModule,RegisterComponent]
})
export class AuthenticationModule { }