import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';

import { NoteService, Note } from '@avengers-game-guide/shared/notes/data-access';
import { groupBy, prop } from 'ramda';
import { Observable } from 'rxjs';
import { tap, switchMap, map} from 'rxjs/operators';

@Component({
  templateUrl: './notes-view.component.html',
  styleUrls: ['./notes-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesViewComponent implements OnInit {

  notes$: Observable<Record<string, Note[]>>;

  constructor(private notesService: NoteService, private heroes: HeroService, private titleService: Title) {
    this.notes$ = this.heroes.selected$.pipe(
      tap(hero => this.titleService.setTitle(`Avengers GG | Notes | ${hero.name}`)),
      tap(hero => { this.notesService.clearCache(); this.notesService.getWithQuery({hero_id: hero.id})}),
      switchMap(() => this.notesService.entities$),
      map(notes => groupBy(prop('category'), notes))
    )
  }

  ngOnInit(): void {
  }

}
