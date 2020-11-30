import { Component, Directive, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'agg-panel-header-subtitle',
  template: `<agg-fancy-text><ng-content></ng-content></agg-fancy-text>`,
  styles: [':host { display: block; font-size: 14px; }']
})
export class PanelHeaderSubtitleComponent {}

@Component({
  selector: 'agg-panel-header',
  template: `<agg-fancy-text><ng-content></ng-content><ng-content select="agg-panel-header-subtitle"></ng-content></agg-fancy-text>`,
  styles: []
})
export class PanelHeaderComponent {}

@Component({
  selector: 'agg-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
