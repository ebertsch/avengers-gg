import { PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { reduce } from 'ramda';

@Pipe({
    name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){}

  transform(value: string, args: any): any {
    if(!value) return;
    
    const re = new RegExp(/\[.*?\]/, 'gi');
    const matches: string[] = value.match(re);

    if (!matches) {
      return value;
    }

    const replacedValue = reduce(
      (acc, current) => {
        return acc.replace(current, "<span class='attribute'>" + current + "</span>")
      },
      value, matches
    )

    // const replacedValue = value.replace(re, "<span class='attribute'>" + matches[0] + "</span>")
    return this.sanitizer.bypassSecurityTrustHtml(replacedValue)
  }
}