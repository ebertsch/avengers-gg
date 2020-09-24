import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Hero } from '@avengers-game-guide/shared/heroes/data-access'


@Component({
  selector: 'agg-hero-navigation',
  templateUrl: './hero-navigation.component.html',
  styleUrls: ['./hero-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroNavigationComponent implements OnInit {

  @Input()
  heroes: Hero[];

  constructor() { }

  ngOnInit(): void { }

}
