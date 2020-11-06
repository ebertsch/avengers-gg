export interface Hero {
    id: string;
    name: string;
    gearNames?: {
      melee: string
      ranged: string
      defense: string
      heroic: string
    }
  }
  