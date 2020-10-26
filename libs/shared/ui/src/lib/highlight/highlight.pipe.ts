import { PipeTransform, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
    name: 'highlight'
})
export class HighlightPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){}

  transform(value: any, args: any): any {
    const re = new RegExp(/\[.*?\]/, 'gi');
    const match = value.match(re);

    if (!match) {
      return value;
    }

    const replacedValue = value.replace(re, "<span class='attribute'>" + match[0] + "</span>")
    return this.sanitizer.bypassSecurityTrustHtml(replacedValue)
  }
}