
import { PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'uncamelcase'
})
export class UncamelCasePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){}

  transform(value: string, args: any): any {
    if(!value) return;
    
    return value.replace(/([a-z])([A-Z])/g, '$1 $2');

  }
}