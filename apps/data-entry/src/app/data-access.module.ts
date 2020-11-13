import { NgModule } from '@angular/core';
import { DataAccessModule as HeroesDataAccessModule, HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { DataAccessModule as PerksDataAccessModule, PerkService } from '@avengers-game-guide/shared/perks/data-access'
import { DataAccessModule as GearDataAccessModule, GearService } from '@avengers-game-guide/shared/gear/data-access'
import { DataAccessModule as NamedSetDataAccessModule, NamedSetService } from '@avengers-game-guide/shared/named-sets/data-access'
import { DataAccessModule as GuidesDataAccessModule, GuideService } from '@avengers-game-guide/shared/guides/data-access'
import { NotesDataAccessModule, NoteService } from '@avengers-game-guide/shared/notes/data-access'
@NgModule({
    imports: [
        HeroesDataAccessModule,
        PerksDataAccessModule,
        GearDataAccessModule,
        NamedSetDataAccessModule,
        GuidesDataAccessModule,
        NotesDataAccessModule,
    ],
    exports: [
        HeroesDataAccessModule,
        PerksDataAccessModule,
        GearDataAccessModule,
        NamedSetDataAccessModule,
        GuidesDataAccessModule,
        NotesDataAccessModule,
    ]
})
export class DataAccessModule {
    constructor(
        heroService: HeroService,
        perkService: PerkService,
        gearService: GearService,
        namedSetService: NamedSetService,
        guideService: GuideService,
        noteService: NoteService) {
        heroService.getAll()
        perkService.getAll()
        gearService.getAll()
        namedSetService.getAll()
        guideService.getAll()
        noteService.getAll()
    }
}
