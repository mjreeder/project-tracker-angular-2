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

  getProjectByID(id) {
    var url = 'https://apso.bsu.edu/tools/projects/api/projects/' + id;
    var jwtString = this.getJWTString();
    return this.getRequestAuth(url, jwtString);
  }

  getAllStatuses() {
    var url = 'https://apso.bsu.edu/tools/projects/api/statuses';
    return this.getRequest(url);
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

  createNewDate(projectID, name, description, date) {
    var jwtString = this.getJWTString();
    var url = 'https://apso.bsu.edu/tools/projects/api/dates';
    let data = new URLSearchParams();
    data.append('project_id', projectID);
    data.append('name', name);
    data.append('description', description);
    data.append('date', date);
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

  patchRequestAuth(url: string, data: Object, jwtString: string) {
    var headers = this.createAuthorizationHeader(jwtString);
    return this.http
      .patch(url, data, { 'headers': headers })
      .map(response => response.json())
      .toPromise();
  }

  deleteRequestAuth(url: string, jwtString: string) {
    var headers = this.createAuthorizationHeader(jwtString);
    return this.http
      .delete(url, { 'headers': headers })
      .map(response => response.json())
      .toPromise();
  }

  postProjectTask(projectID, name) {
    var url = 'https://apso.bsu.edu/tools/projects/api/tasks';
    var jwtString = this.getJWTString();
    let data = new URLSearchParams();
    data.append('name', name);
    data.append('project_id', projectID);
    return this.postRequestAuth(url, data, jwtString);
  }

  editProjectName(name, id) {
    var url = 'https://apso.bsu.edu/tools/projects/api/projects/' + id;
    var jwtString = this.getJWTString();
    let data = new URLSearchParams();
    data.append('name', name);
    return this.patchRequestAuth(url, data, jwtString);
  }

  editProjectDescription(description, id) {
    var url = 'https://apso.bsu.edu/tools/projects/api/projects/' + id;
    var jwtString = this.getJWTString();
    let data = new URLSearchParams();
    data.append('description', description);
    return this.patchRequestAuth(url, data, jwtString);
  }

  editProjectStatus(statusID, id) {
    var url = 'https://apso.bsu.edu/tools/projects/api/projects/' + id;
    var jwtString = this.getJWTString();
    let data = new URLSearchParams();
    data.append('status_id', statusID);
    return this.patchRequestAuth(url, data, jwtString);
  }

  editProjectNotes(note, id) {
    var url = 'https://apso.bsu.edu/tools/projects/api/projects/' + id + '/notes';
    var jwtString = this.getJWTString();
    let data = new URLSearchParams();
    data.append('notes', note);
    return this.patchRequestAuth(url, data, jwtString);
  }

  editProjectConfidence(rating, id) {
    var url = 'https://apso.bsu.edu/tools/projects/api/projects/' + id + '/confidence';
    var jwtString = this.getJWTString();
    let data = new URLSearchParams();
    data.append('rating', rating);
    return this.patchRequestAuth(url, data, jwtString);
  }

  editProjectPriority(rating, id) {
    var url = 'https://apso.bsu.edu/tools/projects/api/projects/' + id + '/priority';
    var jwtString = this.getJWTString();
    let data = new URLSearchParams();
    data.append('rating', rating);
    return this.patchRequestAuth(url, data, jwtString);
  }

  editProjectTask(completedAt, name, id) {
    var url = 'https://apso.bsu.edu/tools/projects/api/tasks/' + id;
    var jwtString = this.getJWTString();
    let data = new URLSearchParams();
    data.append('name', name);
    data.append('completed_at', completedAt);
    return this.patchRequestAuth(url, data, jwtString);
  }

  deleteProjectTask(id) {
    var url = 'https://apso.bsu.edu/tools/projects/api/tasks/' + id;
    var jwtString = this.getJWTString();
    return this.deleteRequestAuth(url, jwtString);
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
