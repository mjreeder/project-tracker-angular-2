import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import {StudentComponent} from './components/student/student.component';
import {ProjectComponent} from './components/project/project.component';
import {ProjectDetailComponent} from './components/project-detail/project-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  {path: 'student', component: StudentComponent},
  {path: 'project', component: ProjectComponent},
  {path: 'project-detail', component: ProjectDetailComponent},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
