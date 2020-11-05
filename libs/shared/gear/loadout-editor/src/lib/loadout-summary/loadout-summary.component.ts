import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GearEditorService } from '../gear-editor.service'

@Component({
  selector: 'agg-loadout-summary',
  templateUrl: './loadout-summary.component.html',
  styleUrls: ['./loadout-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadoutSummaryComponent implements OnInit {

  constructor(public gearEditorService: GearEditorService) { }

  ngOnInit(): void {
  }

}
