import { PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { sortBy, prop } from 'ramda';

@Pipe({
    name: 'sortBy'
})
export class SortByPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){}

  transform(value: any[], column: string = ''): any[] {
    if (!value) { return value; } // no array
    if (value.length <= 1) { return value; } // array with only one item
    if (!column || column === '') { 
      return value.sort()
    }

    return sortBy(prop(column), value);
  }
}