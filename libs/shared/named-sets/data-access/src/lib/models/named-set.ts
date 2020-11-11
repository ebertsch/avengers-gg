import { Loadout, ItemSource } from '@avengers-game-guide/shared/data'

export interface NamedSetBase {
    id: string
    title: string
    heroId: string
    sources: ItemSource[]
}
export type NamedSet = NamedSetBase & Loadout<string>