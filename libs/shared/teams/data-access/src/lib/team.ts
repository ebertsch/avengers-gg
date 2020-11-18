import { Loadout } from '@avengers-game-guide/shared/data'
import { GearInstance } from '@avengers-game-guide/shared/gear/data-access'

export interface Team {
    [heroId: string]: Loadout<GearInstance>
}