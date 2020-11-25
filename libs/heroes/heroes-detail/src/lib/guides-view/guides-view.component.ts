import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';

import { GuideService, Guide } from '@avengers-game-guide/shared/guides/data-access';
import { Observable } from 'rxjs';
import { tap, switchMap} from 'rxjs/operators';

@Component({
  templateUrl: './guides-view.component.html',
  styleUrls: ['./guides-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class GuidesViewComponent implements OnInit {
  
  guides$: Observable<Guide[]>;

  constructor(private guides: GuideService, private heroes: HeroService, private titleService: Title) {
    this.guides$ = this.heroes.selected$.pipe(
      tap(hero => this.titleService.setTitle(`Avengers GG | Guides | ${hero.name}`)),
      tap(hero => { this.guides.clearCache(); this.guides.getWithQuery({hero_id: hero.id})}),
      switchMap(() => this.guides.entities$)
    )
  }

  ngOnInit(): void {
  }

}
