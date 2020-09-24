import { Component, Directive, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Directive({
  selector: 'agg-panel-header',
  host: {'class': 'fancy-text'}
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
