import { Component } from '@angular/core';


@Component({
  selector: 'aggd-root',
  templateUrl: 'app.component.html',
  styles: [
    ':host {display: block; height: 100vh}',
    'main { margin: 10px 20px; }',
    'a { margin-left: 20px; text-transform: capitalize; font-size: 16px }',
    'a:first-of-type { margin-left: 30px }',
    'a:hover { text-decoration: none; color: rgba(255,255,255, 0.87); }'
  ],
})
export class AppComponent  {

  constructor() { }
 
}
