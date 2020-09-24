import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';

import { BuildService, Build } from '@avengers-game-guide/shared/builds/data-access';
import { Observable } from 'rxjs';
import { tap, switchMap} from 'rxjs/operators';

@Component({
  templateUrl: './builds-view.component.html',
  styleUrls: ['./builds-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class BuildsViewComponent implements OnInit {
  
  builds$: Observable<Build[]>;

  constructor(private builds: BuildService, private heroes: HeroService) {
  }

  ngOnInit(): void {
    this.builds$ = this.heroes.selected$.pipe(
      tap(hero =>{
        return this.builds.getWithQuery({heroId: hero.id})}),
      switchMap(() => this.builds.entities$)
    )
  }

}
