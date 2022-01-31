import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserCardComponent } from './user-card/user-card.component';
import { MatCardModule } from '@angular/material/card';
import { FlexModule } from '@angular/flex-layout';
import { CredentialsPipe } from '../../core/pipes/credentials.pipe';

@NgModule({
  declarations: [
    UsersComponent,
    UserCardComponent,
    CredentialsPipe,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatCardModule,
    FlexModule,
  ],
  exports: [
    UsersComponent,
  ],
})
export class UsersModule {
}
