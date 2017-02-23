import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { API } from '../../services/api/api.service';

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
  private projectTimeRemaining: any;
  private projectNotes: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private API: API,

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
    Promise.all([projectPromeis, projectJPMPromise, staffPromse, assignmentPromise, studentPromise]).then((result) => {
      this.getJPMFromID(result[0].jpm_ultimate_id, result[1]);
      this.getStaffFromId(result[0].staff_ultimate_id, result[2]);
      this.project = result[0];
      this.assignments = result[3];
      this.students = result[4];
      this.project.students = this.getProjectStudents(this.project);
      this.project.formatedDeadline = this.getFormatedDeadline(this.project);
      this.getTimeRemaining();
      this.getMajorDeadlines();
      this.getProjectNotes();
      this.getProjectTasks();
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

  getFormatedDeadline(project: any): string {
    var dateParts = project.deadline.split('-');
    var myDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    var locale = "en-us";
    var month = myDate.toLocaleString(locale, { month: "long" });
    var day = myDate.getDate();
    return month + ' ' + day;
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
        var dateParts = this.project.dates[i].date.split('-');
        var myDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        var locale = "en-us";
        var month = myDate.toLocaleString(locale, { month: "long" });
        var day = myDate.getDate();
        this.project.dates[i].formattedDate = month + ' ' + day;
      }
    }
  }

  getProjectNotes() {
    if (this.project.notes) {
      this.projectNotes = this.project.notes.notes;
    }
  }

  getProjectTasks(){
    if(this.project.tasks.length > 0){
      console.log('derp');
    }
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
