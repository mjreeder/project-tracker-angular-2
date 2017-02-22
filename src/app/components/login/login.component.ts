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
  private jpms: any[] = [];
  private staff: any[] = [];

  private token: any;
  private userID: number;
  private password: string = 'digitalcorps';

  private employeeType = 'staff';
  private numStaffColumns = 0;
  private numJPMColumns = 0;
  private jpmWidth = '';
  private staffWidth = '';

  constructor(
    private router: Router,
    private API: API
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData() {
    var usersPromise = this.API.getAllUsers();
    var jpmPromise = this.API.getAllJPMS();
    var staffPromise = this.API.getAllStaff();
    Promise.all([usersPromise, jpmPromise, staffPromise]).then((result) => {
      this.users = _.uniqBy(result[0], 'ultimate_id');
      this.jpms = this.filterEmployeeTypeToUsers(result[1]);
      this.staff = this.filterEmployeeTypeToUsers(result[2]);
      this.computeStyleVaribles();
    });
  }

  filterEmployeeTypeToUsers(employees: any[]) {
    var userEmployees: any[] = [];
    for (let i = 0; i < this.users.length; i++) {
      var ultimate_id = this.users[i].ultimate_id;
      var user_id = this.users[i].id;
      var matchedEmployee = _.filter(employees, function(employee) {
        if (employee.id == ultimate_id) {
          employee.user_id = user_id;
          return true;
        } else {
          return false;
        }
      });
      if (matchedEmployee.length == 1) {
        userEmployees.push(matchedEmployee[0]);
      }
    }
    return userEmployees;
  }

  computeStyleVaribles(): void {
    this.numStaffColumns = this.staff.length > 8 ? Math.round(this.staff.length / 2) : 4;
    this.numJPMColumns = this.jpms.length > 8 ? Math.round(this.jpms.length / 2) : 4;
    this.jpmWidth = (this.numJPMColumns * 300 + 60).toString() + "px";
    this.staffWidth = (this.numStaffColumns * 300 + 60).toString() + "px";
  }

  // TODO: Make password come from html instead of hardcoded value

  loginUser(user_id): void {
    this.API.login(user_id, this.password).then((result) => {
      localStorage.setItem('jwtTokenPojectTracker', JSON.stringify(result));
      this.router.navigate(['/projects']);
    }).catch((response) => {
      alert(response.error);
    });

  }

  setActiveEmployeeType(employeeType): void {
    this.employeeType = employeeType;
  }


}
