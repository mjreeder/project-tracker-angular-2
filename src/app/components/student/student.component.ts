import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'student',
  templateUrl: 'student.component.html',
  styleUrls: ['student.component.scss']
})

export class StudentComponent {

  constructor(
    private router: Router,
  ) { }

  goToProjects(): void {
    this.router.navigate(['/projects']);
  }

  goToDetails(): void {
    this.router.navigate(['/project-detail']);
  }


}
