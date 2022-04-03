import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from './user.component';

@NgModule({
  imports: [CommonModule, UserRoutingModule, FormsModule, ReactiveFormsModule],
  exports: [],
  declarations: [UserComponent],
  providers: [UserService],
})
export class UserModule {}
