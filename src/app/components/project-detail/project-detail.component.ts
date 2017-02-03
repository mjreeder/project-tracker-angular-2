import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'project-detail',
  templateUrl: 'project-detail.component.html',
  styleUrls: ['project-detail.component.scss']
})

export class ProjectDetailComponent {

  constructor(
    private router: Router,
  ) { }

  goToProjects(): void {
    this.router.navigate(['/projects']);
  }

  goToStudents(): void {
    this.router.navigate(['/students']);
  }


}
