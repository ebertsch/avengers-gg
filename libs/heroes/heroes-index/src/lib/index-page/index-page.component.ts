import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HeroService, Hero } from '@avengers-game-guide/shared/heroes/data-access';
import { Observable } from 'rxjs';

@Component({
  selector: 'agg-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexPageComponent implements OnInit {

  heroes$: Observable<Hero[]>

  constructor(private heroes: HeroService) { }

  ngOnInit(): void {
    this.heroes$ = this.heroes.entities$
  }

}
