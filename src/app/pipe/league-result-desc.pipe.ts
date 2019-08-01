import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'leagueResultDesc'
})
export class LeagueResultDescPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var str = value.split(':')[1]
    return str.split(',')[0];
  }

}
