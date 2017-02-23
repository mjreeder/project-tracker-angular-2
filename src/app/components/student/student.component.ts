import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { API } from '../../services/api/api.service';

import {TeamFilter} from '../../filters/team-filter';

import * as _ from 'lodash';

@Component({
  selector: 'student',
  templateUrl: 'student.component.html',
  styleUrls: ['student.component.scss']
})

export class StudentComponent implements OnInit {
  private students: any[] = [];
  private filteredStudents: any[] = [];
  private assignments: any[] = [];
  private selectedTeam: string = '';

  private numStudentColumns = 0;
  private studentWidth = '';

  private teamFilter: TeamFilter;

  constructor(
    private router: Router,
    private API: API
  ) {
    this.teamFilter = new TeamFilter();
  }

  ngOnInit() {
    this.getData();
  }

  // TODO: error handling on pPromises
  getData() {
    var studentPromise = this.API.getAllStudents();
    var assignmentPromise = this.API.getAllAssignments();
    Promise.all([studentPromise, assignmentPromise]).then((result) => {
      this.students = result[0];
      this.assignments = result[1];
      this.mapAssignmentsToStudents();
      this.filteredStudents = this.students;
      this.computeStyleVaribles();
    });
  }

  mapAssignmentsToStudents() {
    var assignIndex;
    for (let i = 0; i < this.students.length; i++) {
      var id = this.students[i].id;
      var nameParts = this.students[i].name.split(' ');
      this.students[i].firstName = nameParts[0];
      this.students[i].lastName = nameParts[1];
      var studentAssignments = _.filter(this.assignments, function(o) { return o.ultimate_id == id; });
      if(studentAssignments.length > 0){
        this.students[i].assignments = studentAssignments[0].assignments;
      }
      else{
        this.students[i].assignments = [];
      }
    }
  }

  computeStyleVaribles(): void {
    this.numStudentColumns = this.filteredStudents.length > 8 ? Math.round(this.filteredStudents.length / 2) : 4;
    this.studentWidth = (this.numStudentColumns * 333).toString() + "px";
  }

  setSelectedTeam(team: string): void {
    this.selectedTeam = team;
    this.filteredStudents = this.teamFilter.transform(this.students, this.selectedTeam);
    this.computeStyleVaribles();
  }

}
