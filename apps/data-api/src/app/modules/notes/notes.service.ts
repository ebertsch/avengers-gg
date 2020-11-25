import { Injectable } from '@nestjs/common';
import { DataServiceBase } from '../../data-service-base';
import { Notes } from './notes.model';

@Injectable()
export class NotesService extends DataServiceBase<Notes> {
    constructor() {
        super(Notes)
    }
}
