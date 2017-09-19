import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceArray'
})
export class SliceArrayPipe implements PipeTransform {
  str;
  transform(value: string, exponent: string): string {
    this.str = value.slice(0,180);
    this.str += "..";
    return this.str;
  }

}
