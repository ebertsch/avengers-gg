import { Collection } from 'fireorm';

@Collection("heroes")
export class Hero {
    id: string;
    name: string;
    gearNames: {
        melee: string
        ranged: string
        defense: string
        heroic: string
    }
}