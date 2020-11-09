import { NgModule } from '@angular/core';
import { DataAccessModule as HerosDataAccessModule, HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { DataAccessModule as PerksDataAccessModule, PerkService } from '@avengers-game-guide/shared/perks/data-access'
import { DataAccessModule as GearDataAccessModule, GearService } from '@avengers-game-guide/shared/gear/data-access'
import { DataAccessModule as NamedSetDataAccessModule, NamedSetService } from '@avengers-game-guide/shared/named-sets/data-access'

@NgModule({
    imports: [
        HerosDataAccessModule,
        PerksDataAccessModule,
        GearDataAccessModule,
        NamedSetDataAccessModule
    ],
    exports: [
        HerosDataAccessModule,
        PerksDataAccessModule,
        GearDataAccessModule,
        NamedSetDataAccessModule
    ]
})
export class DataAccessModule {
    constructor(heroService: HeroService, perkService: PerkService, gearService: GearService, namedSetService: NamedSetService) {
        heroService.getAll()
        perkService.getAll()
        gearService.getAll()
        namedSetService.getAll()
    }
}
