import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'aggd-perks-page',
  templateUrl: './perks-page.component.html',
  styleUrls: ['./perks-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerksPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
