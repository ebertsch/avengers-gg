import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { GearInstance } from '@avengers-game-guide/shared/gear/data-access';

@Component({
  selector: 'agg-gear-instance-viewer',
  templateUrl: './gear-instance-viewer.component.html',
  styleUrls: ['./gear-instance-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GearInstanceViewerComponent implements OnInit {

  @Input() activeGear: GearInstance

  constructor() { }

  ngOnInit(): void {
  }

}
