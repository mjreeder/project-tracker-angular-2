import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API } from '../../services/api/api.service';
import * as _ from 'lodash';

@Component({
  selector: 'student',
  templateUrl: 'student.component.html',
  styleUrls: ['student.component.scss']
})

export class StudentComponent implements OnInit {
  private students: any[] = [];
  private assignments: any[] = [];
  private team: string = '';

  constructor(
    private router: Router,
    private API: API
  ) { }

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
    });
  }

  mapAssignmentsToStudents() {
    var assignIndex;
    for (let i = 0; i < this.students.length; i++) {
      var id = this.students[i].id;
      var studentAssignments = _.filter(this.assignments, function(o) { return o.ultimate_id == id; });
      if(studentAssignments.length > 0){
        this.students[i].assignments = studentAssignments[0].assignments;
      }
      else{
        this.students[i].assignments = [];
      }
    }
  }

}
