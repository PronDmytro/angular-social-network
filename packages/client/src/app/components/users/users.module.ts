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
  ],
  exports: [
    UsersComponent,
  ],
})
export class UsersModule {
}
