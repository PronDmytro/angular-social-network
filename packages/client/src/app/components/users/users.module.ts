import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserCardComponent } from './user-card/user-card.component';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout';
import { CredentialsPipe } from '../../core/pipes/credentials.pipe';
import { UserInfoComponent } from './user-info/user-info.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { EducationInfoComponent } from './user-info/education-info/education-info.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsersComponent,
    UserCardComponent,
    CredentialsPipe,
    UserInfoComponent,
    EducationInfoComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatCardModule,
    FlexModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  exports: [
    UsersComponent,
  ],
})
export class UsersModule {
}
