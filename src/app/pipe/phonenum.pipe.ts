import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phonenum'
})
export class PhonenumPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    var vLength = value.toString().length;
    let str1 = value.substring(0,3);
    let str2 = "******";
    let str3 = value.substring(vLength-2,vLength)
    return str1+str2+str3;
  }

}
