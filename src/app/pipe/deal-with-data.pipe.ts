import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dealWithData'
})
export class DealWithDataPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var newArr = value.split(',')
     // 胜
     var winNum = newArr[2];
     // 平
     var drawNum = newArr[3];
     // 负
     var defeatNum = newArr[4];
    //  队名
    var name = newArr[0];

    return name + winNum + '胜' + defeatNum + '负';
  }

}
