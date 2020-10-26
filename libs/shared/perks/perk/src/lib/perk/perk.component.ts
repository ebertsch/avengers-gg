import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Perk } from '@avengers-game-guide/shared/perks/data-access'

@Component({
  selector: 'agg-perk',
  templateUrl: './perk.component.html',
  styleUrls: ['./perk.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerkComponent implements OnInit {

  @Input() perk: Perk;

  constructor() { }

  ngOnInit(): void {
  }

}
