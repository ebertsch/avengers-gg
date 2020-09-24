import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';

import { NoteService, Note } from '@avengers-game-guide/shared/notes/data-access';
import { Observable } from 'rxjs';
import { tap, switchMap} from 'rxjs/operators';

@Component({
  templateUrl: './notes-view.component.html',
  styleUrls: ['./notes-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesViewComponent implements OnInit {

  notes$: Observable<Note[]>;

  constructor(private notes: NoteService, private heroes: HeroService) {
  }

  ngOnInit(): void {
    this.notes$ = this.heroes.selected$.pipe(
      tap(hero => this.notes.getWithQuery({heroId: hero.id})),
      switchMap(() => this.notes.entities$)
    )
  }

}
