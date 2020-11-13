import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { StorageMap } from '@ngx-pwa/local-storage';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { BaseDataPage } from '../base-data-page'
import { Note, NoteService } from '@avengers-game-guide/shared/notes/data-access';


@Component({
  templateUrl: './notes-page.component.html',
  styleUrls: ['./notes-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotesPageComponent extends BaseDataPage<Note> implements OnInit {
  FILTER_KEY = 'filters:notes';
  
  constructor(storage: StorageMap, public noteService: NoteService, public heroService: HeroService) {
    super(storage, noteService)
  }

}
