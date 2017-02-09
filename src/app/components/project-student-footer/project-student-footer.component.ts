import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'project-student-footer',
  templateUrl: 'project-student-footer.component.html',
  styleUrls: ['project-student-footer.component.scss']
})

export class ProjectStudentFooterComponent implements OnInit {

  @Input() activePage: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToProjects(): void {
    this.router.navigate(['/projects']);
  }

  goToStudents(): void {
    this.router.navigate(['/students']);
  }

  logoutUser(): void {
    localStorage.removeItem('jwtTokenString');
    this.router.navigate(['/login']);
  }

}
