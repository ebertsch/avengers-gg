import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'aggd-gear-page',
  templateUrl: './gear-page.component.html',
  styleUrls: ['./gear-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GearPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
