import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { GearEditorService } from '../gear-editor.service'
import { Hero } from '@avengers-game-guide/shared/heroes/data-access';

@Component({
  selector: 'agg-loadout-summary',
  templateUrl: './loadout-summary.component.html',
  styleUrls: ['./loadout-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadoutSummaryComponent implements OnInit {

  @Input() hero: Hero

  constructor(public gearEditorService: GearEditorService) { }

  ngOnInit(): void {
  }

}
