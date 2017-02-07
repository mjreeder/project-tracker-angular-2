import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { API } from '../../services/api/api.service';

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

  getData() {
    var promise = new Promise((resolve, reject) => {
      this.getAllStudents();
      this.getAllAssignments();
    });
    promise.then(response => {
      this.mapAssignmentsToStudents();
    });
  }

  getAllStudents() {
    this.API.getAllStudents().then((result) => {
      this.students = result;
    });
  }

  getAllAssignments() {
    this.API.getAllAssignments().then((result) => {
      this.assignments = result;
    });
  }

  mapAssignmentsToStudents() {
    var assignIndex;
    for (let i = 0; i < this.students.length; i++) {
      assignIndex = this.findIdMatch(this.students[i].id);
      if (assignIndex) {
        this.students[i].assignments = this.assignments[assignIndex].assignments;
        this.assignments.splice(assignIndex, 1);
      } else {
        this.students[i].assignments = [];
      }
    }
  }

  findIdMatch(id): any {
    for (let x = 0; x < this.assignments.length; x++) {
      if (id == this.assignments[x].ultimate_id) {
        return x;
      }
    }
    return null;
  }

  goToProjects(): void {
    this.router.navigate(['/projects']);
  }

  logoutUser(): void {
    localStorage.removeItem('jwtTokenString');
    this.router.navigate(['/login']);
  }

}
