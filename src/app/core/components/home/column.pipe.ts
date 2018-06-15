import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'column'
})
export class ColumnPipe implements PipeTransform {

  transform(value: any[], args?: any): any {
    var arr = [];
    for(let i of value){
      for(let j in i){
        console.log('columnName = '+j)
        arr.push(j);
      }
    }
    return arr;
  }

}
