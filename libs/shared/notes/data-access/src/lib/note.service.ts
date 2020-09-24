import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from '@ngrx/data';

import { Note } from './note';

@Injectable({
  providedIn: 'root'
})
export class NoteService extends EntityCollectionServiceBase<Note> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('Note', serviceElementsFactory);
  }
}
