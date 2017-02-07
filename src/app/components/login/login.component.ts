import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { API } from '../../services/api/api.service';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})

export class LoginComponent implements OnInit {
  private users: any[] = [];
  private token:any;
  private userID: number;
  private password: string;

  constructor(
    private router: Router,
    private API: API
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.API.getAllUsers().then((result)=>{
      this.users = result;
    });
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
