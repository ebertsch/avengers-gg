import { Loadout } from '@avengers-game-guide/shared/data'
export interface NamedSetBase {
    id: string
    title: string
    heroId: string
}
export type NamedSet = NamedSetBase & Loadout<string>