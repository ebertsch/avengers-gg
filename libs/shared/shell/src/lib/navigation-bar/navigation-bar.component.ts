import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({

  // tslint:disable-next-line: component-selector
  selector: 'agg-navigation-bar',
  templateUrl: 'navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent implements OnInit {

  constructor() { } 

  ngOnInit(): void {
  }

}
