import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
 
@Pipe({
  name: 'sanitize'
})
export class SanitizePipe implements PipeTransform {
 
  constructor(private sanitizer: DomSanitizer) {
  }
 
  transform(value: any, sanitizeType?: any): any {
    if(!value || typeof value !== 'string') return value
    switch(sanitizeType) {
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(value)
      default:
        return value
    }
  }
 
}