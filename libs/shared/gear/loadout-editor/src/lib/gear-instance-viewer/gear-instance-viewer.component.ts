import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'agg-gear-instance-viewer',
  templateUrl: './gear-instance-viewer.component.html',
  styleUrls: ['./gear-instance-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GearInstanceViewerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
