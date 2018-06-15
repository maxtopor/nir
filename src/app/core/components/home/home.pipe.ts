import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tables'
})
export class HomePipe implements PipeTransform {

  transform(value: any[], args?: any): any[] {
    let arr = [];
    for(let k in value[0]){
      console.log();
      arr.push(k);
    }
    return arr;
  }

}
