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
    var jpmPromise = this.API.getAllJPMS();
    var usersPromise = this.API.getAllUsers();
    var staffPromise = this.API.getAllStaff();
    Promise.all([jpmPromise, usersPromise, staffPromise]).then((result) => {
      this.jpms = result[0];
      this.users = result[1];
      this.staff = result[2];
      this.jpms = this.filterJPMSToUsers();
    });
  }

  filterJPMSToUsers() {
    var userJPMS: any[] = [];
    for (let i = 0; i < this.users.length; i++) {
      var ultimate_id = this.users[i].ultimate_id;
      var user_id = this.users[i].id;
      var matchedJPM = _.filter(this.jpms, function(jpm) {
        if (jpm.id == ultimate_id) {
          jpm.user_id = user_id;
          return true;
        } else {
          return false;
        }
      });
      if (matchedJPM.length == 1) {
        userJPMS.push(matchedJPM[0]);
      }
    }
    return userJPMS;
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
