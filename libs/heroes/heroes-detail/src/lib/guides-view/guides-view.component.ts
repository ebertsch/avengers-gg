import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
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

  constructor(private guides: GuideService, private heroes: HeroService) {
  }

  ngOnInit(): void {
    this.guides$ = this.heroes.selected$.pipe(
      tap(hero => this.guides.getWithQuery({heroId: hero.id})),
      switchMap(() => this.guides.entities$)
    )
  }

}
