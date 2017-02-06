import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'teamFilter',
  pure: false
})

@Injectable()

export class TeamFilter implements PipeTransform {
  transform(students: any[], selectedTeam: string): any {
    if (selectedTeam == '' || students.length < 1) {
      return students;
    } else {
      return students.filter(student => student.team == selectedTeam);
    }
  }
}
