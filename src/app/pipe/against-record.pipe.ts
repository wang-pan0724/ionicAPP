import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'againstRecord'
})
export class AgainstRecordPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // 胜
    var winNum = 0;
    // 平
    var drawNum = 0;
    // 负
    var defeatNum = 0;
    for(var i=0; i<value.length; i++){
      if(value[i].result == "胜"){
        winNum++;
      }
      if(value[i].result == "平"){
        drawNum++;
      }
      if(value[i].result == "负"){
        defeatNum++;
      }
    }
    return winNum + "胜" + drawNum + "平" + defeatNum + "负";
  }

}
