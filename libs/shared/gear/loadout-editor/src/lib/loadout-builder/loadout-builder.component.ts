import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { Hero } from '@avengers-game-guide/shared/heroes/data-access';

@Component({
  selector: 'agg-loadout-builder',
  templateUrl: './loadout-builder.component.html',
  styleUrls: ['./loadout-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadoutBuilderComponent implements OnInit {

  @Input() hero: Hero

  constructor() { }

  ngOnInit(): void {
    console.log('hero', this.hero)
  }

}
