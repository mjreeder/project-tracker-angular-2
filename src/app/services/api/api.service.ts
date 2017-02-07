import { Http, URLSearchParams } from '@angular/http';
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

  login(userID, password) {
    var url = 'https://apso.bsu.edu/tools/projects/api/users/initialize';
    let data = new URLSearchParams();
    data.append('user_id', userID);
    data.append('password', password);
    return this.postRequest(url, data);
  }

  getRequest(url: string) {
    return this.http
      .get(url)
      .map(response => response.json())
      .toPromise();
  }

  postRequest(url: string, data: Object) {
    return this.http
      .post(url, data)
      .map(response => response.json())
      .toPromise()
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.json());
  }

}
