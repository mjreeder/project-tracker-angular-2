import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import {StudentComponent} from './components/student/student.component';
import {ProjectComponent} from './components/project/project.component';
import {ProjectDetailComponent} from './components/project-detail/project-detail.component';

import {LoginGuard} from './guards/login.guard';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  {path: 'students', component: StudentComponent, canActivate: [LoginGuard]},
  {path: 'projects', component: ProjectComponent, canActivate: [LoginGuard]},
  {path: 'project-details/:id', component: ProjectDetailComponent, canActivate: [LoginGuard]},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
