import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'agg-loadout-builder',
  templateUrl: './loadout-builder.component.html',
  styleUrls: ['./loadout-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadoutBuilderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
