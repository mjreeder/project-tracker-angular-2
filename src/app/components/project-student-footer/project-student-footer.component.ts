import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'project-student-footer',
  templateUrl: 'project-student-footer.component.html',
  styleUrls: ['project-student-footer.component.scss']
})

export class ProjectStudentFooterComponent implements OnInit {

  @Input() activePage: string;

  @Output()
  addProjectEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router
  ) { }

  addProject(){
    this.addProjectEvent.emit('');
  }
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
