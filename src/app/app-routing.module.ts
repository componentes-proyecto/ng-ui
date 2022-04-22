import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AppViewComponent } from './app-view/app-view.component';
import { SessionGuard } from './guards/session.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '', redirectTo: "/register", pathMatch: 'full'
  }, {
    path: 'register',
    component: AddUserComponent
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'app',
    component: AppViewComponent,
    canActivate: [ SessionGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
