import { NgModule } from '@angular/core';
import { DataAccessModule as HeroesDataAccessModule, HeroService } from '@avengers-game-guide/shared/heroes/data-access';
import { DataAccessModule as PerksDataAccessModule, PerkService } from '@avengers-game-guide/shared/perks/data-access'
import { DataAccessModule as GearDataAccessModule, GearService } from '@avengers-game-guide/shared/gear/data-access'
import { DataAccessModule as NamedSetDataAccessModule, NamedSetService } from '@avengers-game-guide/shared/named-sets/data-access'
import { DataAccessModule as GuidesDataAccessModule, GuideService } from '@avengers-game-guide/shared/guides/data-access'
@NgModule({
    imports: [
        HeroesDataAccessModule,
        PerksDataAccessModule,
        GearDataAccessModule,
        NamedSetDataAccessModule,
        GuidesDataAccessModule
    ],
    exports: [
        HeroesDataAccessModule,
        PerksDataAccessModule,
        GearDataAccessModule,
        NamedSetDataAccessModule,
        GuidesDataAccessModule
    ]
})
export class DataAccessModule {
    constructor(heroService: HeroService, perkService: PerkService, gearService: GearService, namedSetService: NamedSetService, guideService: GuideService) {
        heroService.getAll()
        perkService.getAll()
        gearService.getAll()
        namedSetService.getAll()
        guideService.getAll()
    }
}
