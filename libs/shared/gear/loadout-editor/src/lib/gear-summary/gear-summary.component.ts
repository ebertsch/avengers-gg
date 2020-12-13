import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { GearEditorService } from '../gear-editor.service';

@Component({
  selector: 'agg-gear-summary',
  templateUrl: './gear-summary.component.html',
  styleUrls: ['./gear-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GearSummaryComponent implements OnInit {

  constructor(public gearEditorService: GearEditorService) { }

  ngOnInit(): void {
  }

}
