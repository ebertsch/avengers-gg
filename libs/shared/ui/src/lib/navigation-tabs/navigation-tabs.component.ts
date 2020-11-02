import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { Dictionary } from 'ramda';

@Component({
  selector: 'agg-navigation-tab',
  template: `<agg-fancy-text><a [routerLink]="link" [queryParams]="params" routerLinkActive="active"><ng-content></ng-content></a></agg-fancy-text>`
})
export class NavigationTabComponent implements OnInit {

  @Input() link: string | any[];
  @Input() params: Dictionary<any>;

  constructor() { }

  ngOnInit(): void {
  }

}


@Component({
  selector: 'agg-navigation-tabs',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./navigation-tabs.component.scss'],
})
export class NavigationTabsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
