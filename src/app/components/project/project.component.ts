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

  private numProjectColumns = 0;
  private projectWidth = '';

  private selectedStatus: string = '';
  private statusFilter: StatusFilter;

  private showNewProjectForm: boolean = false;
  private projectName: string;
  private projectDescription: string;
  private projectDeadline: string;

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
    this.API.getAllProjects().then((result) => {
      this.projects = result;
      this.formatProjectData();
      this.filteredProjects = this.projects
      this.computeStyleVaribles();
    }).catch(this.handleError);
  }

  handleError(error: any): void {
    console.log(error);
  }

  formatProjectData(): void {
    for (let i = 0; i < this.projects.length; i++) {
      this.projects[i].name = this.reduceProjectNameLength(this.projects[i]);
      this.projects[i].formatedDeadline = this.getFormatedDeadline(this.projects[i]);
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

  computeStyleVaribles(): void {
    this.numProjectColumns = this.filteredProjects.length > 8 ? Math.round(this.filteredProjects.length / 2) : 4;
    this.projectWidth = (this.numProjectColumns * 333).toString() + "px";
  }

  setSelectedStatus(status: string): void {
    this.selectedStatus = status;
    this.filteredProjects = this.statusFilter.transform(this.projects, this.selectedStatus);
    this.computeStyleVaribles();
  }

  addNewProject(event){
    this.showNewProjectForm = true;
  }

  createNewProject() {
    this.API.createNewProject(this.projectName, this.projectDescription, this.projectDeadline).then((result) => {
      var project = this.formatNewProjectData(result);
      this.insertNewProjectIntoArray(project);
      this.showNewProjectForm = false;
    }).catch((response) => {
      this.showNewProjectForm = false;
    });
  }

  formatNewProjectData(project: any): any {
    project.name = this.reduceProjectNameLength(project);
    project.formatedDeadline = this.getFormatedDeadline(project);
    return project;
  }

  insertNewProjectIntoArray(project: any): void {
    var insertIndex = _.sortedIndexBy(this.projects, project, 'name');
    this.projects.splice(insertIndex, 0, project);
    this.filteredProjects = this.statusFilter.transform(this.projects, this.selectedStatus);
  }

  goToDetails(id): void {
    this.router.navigate(['/project-details', id]);
  }

}
