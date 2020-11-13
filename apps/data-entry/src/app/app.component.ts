import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '@avengers-game-guide/shared/environments';

@Component({
  selector: 'aggd-root',
  template: `
          <mat-toolbar color="primary">
            <span>AGG Data Entry</span>
            <a mat-button [routerLink]="['gear']">Gear</a>
            <a mat-button [routerLink]="['perks']">Perks</a>
            <a mat-button [routerLink]="['named-sets']">Sets</a>
            <a mat-button [routerLink]="['guides']">Guides</a>
            <a mat-button [routerLink]="['notes']">Notes</a>
            <span class="spacer"></span>
            <button mat-button (click)="saveDB()">Save</button>
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

  constructor(private http: HttpClient) {}

  saveDB() {
    this.http.post(`${environment.dataEntryClientApiUrl}/save`, null).subscribe();
  }
}
