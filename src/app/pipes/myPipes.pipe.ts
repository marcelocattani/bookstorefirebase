

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'truncador'})
export class Truncar implements PipeTransform {

  transform(value: string): string {
    
    if (value.length > 200) {
      return value.substr(0,200)+"...";
    }
    return value;   
  }

}
