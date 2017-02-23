import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { StudentComponent } from './components/student/student.component';
import { ProjectComponent } from './components/project/project.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ProjectStudentFooterComponent } from './components/project-student-footer/project-student-footer.component';

import { API } from './services/api/api.service';
import { Helper } from './services/helpers/helpers.service';

import { AppRoutingModule } from './app-routing.module';

import {TeamFilter} from './filters/team-filter';
import {StatusFilter} from './filters/status-filter';

import {LoginGuard} from './guards/login.guard';

import '../rxjs-extensions';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StudentComponent,
    ProjectComponent,
    ProjectDetailComponent,
    ProjectStudentFooterComponent,
    TeamFilter,
    StatusFilter
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [API, LoginGuard, Helper],
  bootstrap: [AppComponent]
})
export class AppModule { }
