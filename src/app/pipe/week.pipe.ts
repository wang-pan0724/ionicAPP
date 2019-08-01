import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'week'
})
export class WeekPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    value = value.split(' ')[0];
    var weekArray = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
    var week = new Date(value).getDay()
    return weekArray[week];
  }

}
