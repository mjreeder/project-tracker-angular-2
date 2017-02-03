import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'project',
  templateUrl: 'project.component.html',
  styleUrls: ['project.component.scss']
})

export class ProjectComponent {

  constructor(
    private router: Router,
  ) { }

  goToDetails(): void {
    this.router.navigate(['/project-detail']);
  }

  goToStudents(): void {
    this.router.navigate(['/students']);
  }


}
