import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'statusFilter',
  pure: false
})

@Injectable()

export class StatusFilter implements PipeTransform {
  transform(projects: any[], selectedStatus: string): any {
    if (selectedStatus == '' || projects.length < 1) {
      return projects;
    } else {
      return projects.filter(project => project.status == selectedStatus);
    }
  }
}
