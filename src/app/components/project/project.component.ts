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

  goToDetails(id): void {
    this.router.navigate(['/project-details', id]);
  }

  addNewProject(event){
    console.log(event);
  }

}
