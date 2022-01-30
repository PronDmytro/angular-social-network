import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateEditUserRoutingModule } from './create-edit-user-routing.module';
import { CreateEditUserComponent } from './create-edit-user.component';


@NgModule({
  declarations: [
    CreateEditUserComponent,
  ],
  imports: [
    CommonModule,
    CreateEditUserRoutingModule,
  ],
})
export class CreateEditUserModule {
}
