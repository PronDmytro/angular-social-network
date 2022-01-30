import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEditUserComponent } from './create-edit-user.component';

const routes: Routes = [{ path: '', component: CreateEditUserComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateEditUserRoutingModule {
}
