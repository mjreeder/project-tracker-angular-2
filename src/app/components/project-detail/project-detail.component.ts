import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { API } from '../../services/api/api.service';
import { Helper } from '../../services/helpers/helpers.service';
import { BrowserModule }  from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'project-detail',
  templateUrl: 'project-detail.component.html',
  styleUrls: ['project-detail.component.scss']
})


export class ProjectDetailComponent implements OnInit, OnDestroy {

  id: number;
  private sub: any;
  private project: any = {};
  private projectJPM: any = {};
  private staffMember: any = {};
  private assignments: any[] = [];
  private students: any[] = [];
  private statuses: any[] = [];
  private projectTimeRemaining: any;
  private projectNotes: any;
  private projectPriority: any;
  private projectConfidence: any;

  private selectedStatus: string;

  private dateName: string;
  private dateDescription: string;
  private dateString: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private API: API,
    private helper: Helper

  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number

      // In a real app: dispatch action to load the details here.
    });
    var projectPromeis = this.API.getProjectByID(this.id);
    var projectJPMPromise = this.API.getAllJPMS();
    var staffPromse = this.API.getAllStaff();
    var assignmentPromise = this.API.getAllAssignments();
    var studentPromise = this.API.getAllStudents();
    var statusPromise = this.API.getAllStatuses();
    Promise.all([projectPromeis, projectJPMPromise, staffPromse, assignmentPromise, studentPromise, statusPromise]).then((result: any) => {
      this.getJPMFromID(result[0].jpm_ultimate_id, result[1]);
      this.getStaffFromId(result[0].staff_ultimate_id, result[2]);
      this.project = result[0];
      this.assignments = result[3];
      this.students = result[4];
      this.statuses = result[5];
      this.project.students = this.getProjectStudents(this.project);
      this.project.formatedDeadline = this.helper.getFormattedDate(this.project.deadline);
      this.projectConfidence = this.project.confidence;
      this.projectPriority = this.project.priority;
      this.getTimeRemaining();
      this.getMajorDeadlines();
      this.getProjectNotes();
      this.selectedStatus = this.project.status_id;
      console.log(this.project);
    }).catch(this.handleError);
  }

  handleError(error: any): void {
    console.log(error);
  }

  getJPMFromID(jpmId, jpmsObject) {
    if (jpmId !== null) {
      var temporaryThis = this;
      var projectJPM = _.forIn(jpmsObject, function(value, key) {
        if (value.id == jpmId) {
          temporaryThis.projectJPM = value;
        }
      });
    }
  }

  getStaffFromId(staffId, staffArray: any[]) {
    if (staffId !== null) {
      var staffMember = _.findIndex(staffArray, function(o) { return o.id == staffId; });
      this.staffMember = staffArray[staffMember];
    }
  }

  getProjectStudents(project: any): any[] {
    var students = [];
    var studentAssignments = _.filter(this.assignments, { assignments: [{ project_id: project.id }] });
    for (let x = 0; x < studentAssignments.length; x++) {
      var studentObject = _.find(this.students, ['id', parseInt(studentAssignments[x].ultimate_id)]);
      if (studentObject !== undefined) {
        students.push(studentObject);
      }
    }
    return students;
  }

  addProjectTask(newTask) {
    var createTaskPromise = this.API.postProjectTask(this.project.id, newTask);
    createTaskPromise.then((result: any) => {
      this.project.tasks.push(result);
    }).catch(this.handleError);
  }

  getTimeRemaining() {
    var projectDeadlineDate = new Date(this.project.deadline);
    var today = new Date();
    var timeDiff = Math.abs(today.getTime() - projectDeadlineDate.getTime());
    this.projectTimeRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  getMajorDeadlines() {
    if (this.project.deadline.length > 0) {
      for (let i = 0; i < this.project.dates.length; i++) {
        this.project.dates[i].formatedDate = this.helper.getFormattedDate(this.project.dates[i].date);
      }
    }
  }

  getProjectNotes() {
    if (this.project.notes) {
      this.projectNotes = this.project.notes.notes;
    }
  }

  editProjectName(newName: string) {
    this.API.editProjectName(newName, this.project.id);
  }

  editProjectDescription(newDescription: string) {
    this.API.editProjectDescription(newDescription, this.project.id);
  }

  editProjectStatus(newStatusID: string) {
    this.API.editProjectStatus(newStatusID, this.project.id);
  }

  editProjectNotes() {
    var newProjectNotes = document.getElementById('notesEditor').innerText;
    this.API.editProjectNotes(newProjectNotes, this.project.id);
    this.projectNotes = newProjectNotes;
  }

  editProjectConfidence(){
    this.API.editProjectConfidence(this.projectConfidence, this.project.id);
  }

  editProjectPriority(){
    this.API.editProjectPriority(this.projectPriority, this.project.id);
  }

  editProjectTask(taskID, taskName){
    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDay() + 1;
    var completedAt = year + '-' + month + '-' + day;
    this.API.editProjectTask(completedAt, taskName, this.project.id);
  }

  deleteTask() {
    this.API.deleteProjectTask
  }

  createNewDate() {
    this.API.createNewDate(this.id, this.dateName, this.dateDescription, this.dateString).then((result) => {
      console.log(result);
    }).catch((response) => {
      console.log(response);
    });
  }

  projectNotesValue(){

  }

  goToProjects(): void {
    this.router.navigate(['/projects']);
  }

  goToStudents(): void {
    this.router.navigate(['/students']);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
