import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { API } from '../../services/api/api.service';

import {StatusFilter} from '../../filters/status-filter';

import * as _ from 'lodash';

@Component({
  selector: 'project',
  templateUrl: 'project.component.html',
  styleUrls: ['project.component.scss']
})

export class ProjectComponent implements OnInit {
  private projects: any[] = [];
  private filteredProjects: any[] = [];
  private assignments: any[] = [];
  private students: any[] = [];

  private numProjectColumns = 0;
  private projectWidth = '';

  private selectedStatus: string = '';

  private statusFilter: StatusFilter;

  constructor(
    private router: Router,
    private API: API
  ) {
    this.statusFilter = new StatusFilter();
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    var projectPromise = this.API.getAllProjects();
    var assignmentPromise = this.API.getAllAssignments();
    var studentPromise = this.API.getAllStudents();
    Promise.all([projectPromise, assignmentPromise, studentPromise]).then((result) => {
      this.projects = result[0];
      this.assignments = result[1];
      this.students = result[2];
      this.formatProjectData();
      this.filteredProjects = this.projects
      this.computeStyleVaribles();
      console.log(result[0]);
    }).catch(this.handleError);
  }

  handleError(error: any): void {
    console.log(error);
  }

  formatProjectData(): void {
    for (let i = 0; i < this.projects.length; i++) {
      this.projects[i].name = this.reduceProjectNameLength(this.projects[i]);
      this.projects[i].formatedDeadline = this.getFormatedDeadline(this.projects[i]);
      this.projects[i].students = this.getProjectStudents(this.projects[i]);
    }
  }

  reduceProjectNameLength(project: any): string {
    if (project.name.length > 15) {
      return project.name.slice(0,15);
    } else {
      return project.name;
    }
  }

  getFormatedDeadline(project: any): string {
    var dateParts = project.deadline.split('-');
    var myDate = new Date(dateParts[0], dateParts[1]-1, dateParts[2]);
    var locale = "en-us";
    var month = myDate.toLocaleString(locale, { month: "long" });
    var day = myDate.getDate();
    return month + ' ' + day;
  }

  getProjectStudents(project: any): any[] {
    var students = [];
    var studentAssignments = _.filter(this.assignments, { assignments: [ { project_id: project.id } ]});
    for (let x = 0; x < studentAssignments.length; x++) {
      var studentObject = _.find(this.students, ['id', parseInt(studentAssignments[x].ultimate_id)]);
      students.push(studentObject);
    }
    return students;
  }

  computeStyleVaribles(): void {
    this.numProjectColumns = this.filteredProjects.length > 8 ? Math.round(this.filteredProjects.length / 2) : 4;
    this.projectWidth = (this.numProjectColumns * 333).toString() + "px";
  }

  setSelectedStatus(status: string): void {
    this.selectedStatus = status;
    this.filteredProjects = this.statusFilter.transform(this.projects, this.selectedStatus);
    this.computeStyleVaribles();
  }

  goToDetails(id): void {
    this.router.navigate(['/project-details', id]);
  }

  addNewProject(event){
    alert("Add event");
  }

}
