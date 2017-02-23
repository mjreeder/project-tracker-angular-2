import { Http, URLSearchParams, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class API {

  constructor(private http: Http) { }

  getAllStudents() {
    var url = 'https://apso.bsu.edu/ultimate/wp-json/ultimate/v1/students';
    return this.getRequest(url);
  }

  getAllAssignments() {
    var url = 'https://apso.bsu.edu/tools/projects/api/assignments';
    return this.getRequest(url);
  }

  getAllUsers() {
    var url = 'https://apso.bsu.edu/tools/projects/api/users';
    return this.getRequest(url);
  }

  getAllStaff() {
    var url = 'https://apso.bsu.edu/ultimate/wp-json/ultimate/v1/staff';
    return this.getRequest(url);
  }

  getAllJPMS() {
    var url = 'https://apso.bsu.edu/ultimate/wp-json/ultimate/v1/students/jpms';
    return this.getRequest(url);
  }

  getAllProjects() {
    var url = 'https://apso.bsu.edu/tools/projects/api/projects';
    var jwtString = this.getJWTString();
    return this.getRequestAuth(url, jwtString);
  }

  getProjectByID(id){
    var url = 'https://apso.bsu.edu/tools/projects/api/projects/' + id;
    var jwtString = this.getJWTString();
    return this.getRequestAuth(url, jwtString);
  }

  login(userID, password) {
    var url = 'https://apso.bsu.edu/tools/projects/api/users/initialize';
    let data = new URLSearchParams();
    data.append('user_id', userID);
    data.append('password', password);
    return this.postRequest(url, data);
  }

  createNewProject(name, description, deadline) {
    var jwtString = this.getJWTString();
    var url = 'https://apso.bsu.edu/tools/projects/api/projects';
    let data = new URLSearchParams();
    data.append('name', name);
    data.append('description', description);
    data.append('deadline', deadline);
    return this.postRequestAuth(url, data, jwtString);
  }

  getRequest(url: string) {
    return this.http
      .get(url)
      .map(response => response.json())
      .toPromise();
  }

  getRequestAuth(url: string, jwtString) {
    console.log(jwtString);
    var headers = this.createAuthorizationHeader(jwtString);
    return this.http
      .get(url, { 'headers': headers })
      .map(response => response.json())
      .toPromise();
  }

  postRequest(url: string, data: Object) {
    return this.http
      .post(url, data)
      .map(response => response.json())
      .toPromise();
  }

  postRequestAuth(url: string, data: Object, jwtString: string) {
    var headers = this.createAuthorizationHeader(jwtString);
    return this.http
      .post(url, data, { 'headers': headers })
      .map(response => response.json())
      .toPromise();
  }

  createAuthorizationHeader(jwtString: string): Headers {
    var headers = new Headers();
    headers.append('Authorization', 'Bearer ' + jwtString);
    return headers;
  }

  getJWTString(): string {
    var jwtToken = JSON.parse(localStorage.getItem('jwtTokenPojectTracker'));
    var jwtString = jwtToken.token;
    return jwtString;
  }

}
