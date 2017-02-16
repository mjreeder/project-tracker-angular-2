import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { API } from '../../services/api/api.service';

import * as _ from 'lodash';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})

export class LoginComponent implements OnInit {
  private users: any[] = [];
  private students: any[] = [];
  private staff: any[] = [];

  private token:any;
  private userID: number;
  private password: string;

  constructor(
    private router: Router,
    private API: API
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    var studentPromise = this.API.getAllStudents();
    var usersPromise = this.API.getAllUsers();
    var staffPromise = this.API.getAllStaff();
    Promise.all([studentPromise, usersPromise, staffPromise]).then((result) => {
      this.students = result[0];
      this.users = result[1];
      this.staff = result[2];
      this.filterStudentsToUsers();
    });
  }

  filterStudentsToUsers() {
    var userStudents: any[] = [];
    for (let i = 0; i < this.users.length; i++) {
      var ultimate_id = this.users[i].ultimate_id;
      var user_id = this.users[i].id;
      var matchedStudents = _.filter(this.students, function(student) {
        if (student.id == ultimate_id) {
          student.user_id = user_id;
          return true;
        } else {
          return false;
        }
      });
      userStudents.push(matchedStudents[0]);
    }
    this.students = userStudents;
  }

  loginUser(): void {
    this.API.login(this.userID, this.password).then((result)=>{
      localStorage.setItem('jwtTokenString', JSON.stringify(result));
      this.router.navigate(['/projects']);
    }).catch((response)=>{
      alert(response.error);
    });

  }


}
