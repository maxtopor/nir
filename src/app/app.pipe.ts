import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'app'
})
export class AppPipe implements PipeTransform {
  
  transform(value: any, args?: any): any[] {
    var arr = [];
    
      for(let key in value){
        arr.push(key);
      }
      //arr.push(prop);      
      //console.log(prop);
    
    return arr;
  } 
}
