import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrameComponent } from './components/frame/frame.component';
import { IsNotLoggedInGuard } from './core/guards/is-not-logged-in.guard';
import { LoginComponent } from './components/login/login.component';
import { IsLoggedInGuard } from './core/guards/is-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    component: FrameComponent,
    children: [
      {
        path: 'auth',
        canActivate: [IsNotLoggedInGuard],
        children: [
          { path: '', redirectTo: 'login', pathMatch: 'full' },
          { path: 'login', component: LoginComponent },
        ],
      },
      {
        path: '',
        canActivate: [IsLoggedInGuard],
        children: [
          { path: '', redirectTo: 'users', pathMatch: 'full' },
          {
            path: 'users',
            loadChildren: () => import('./components/users/users.module').then((m) => m.UsersModule),
          },
          {
            path: 'users/:id',
            loadChildren: () => import('./components/users/users.module').then((m) => m.UsersModule),
          },
          {
            path: 'create-edit',
            loadChildren: () => import('./components/create-edit-user/create-edit-user.module').then((m) => m.CreateEditUserModule),
          },
          {
            path: 'create-edit/:id',
            loadChildren: () => import('./components/create-edit-user/create-edit-user.module').then((m) => m.CreateEditUserModule),
          },
        ],
      },
      { path: '**', redirectTo: 'users', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
