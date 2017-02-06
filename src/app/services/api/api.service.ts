import { Http } from '@angular/http';
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

  getRequest(url: string) {
    return this.http
      .get(url)
      .map(response => response.json())
      .toPromise();
  }

}
