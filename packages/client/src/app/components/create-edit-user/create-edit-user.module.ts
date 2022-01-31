import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateEditUserRoutingModule } from './create-edit-user-routing.module';
import { CreateEditUserComponent } from './create-edit-user.component';
import { ToastrModule } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FlexModule } from '@angular/flex-layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
  declarations: [
    CreateEditUserComponent,
  ],
  imports: [
    CommonModule,
    CreateEditUserRoutingModule,
    ToastrModule.forRoot(),
    MatFormFieldModule,
    ReactiveFormsModule,
    TranslateModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    FlexModule,
    MatCheckboxModule,
    MatCardModule,
    MatStepperModule,
    MatDatepickerModule,
  ],
})
export class CreateEditUserModule {
}
