import { Component } from '@angular/core';

@Component({
  selector: 'aggd-root',
  template: `
          <mat-toolbar color="primary">
            <span>AGG Data Entry</span>
            <a mat-button [routerLink]="['gear']">Gear</a>
            <a mat-button [routerLink]="['perks']">Perks</a>
            <a mat-button [routerLink]="['named-sets']">Sets</a>
          </mat-toolbar>
          <main>
            <router-outlet></router-outlet>
          </main>`,
  styles: [
    ':host: {display: block}',
    'main { margin: 10px 20px; }'
  ],
})
export class AppComponent {
  title = 'data-entry';
}
