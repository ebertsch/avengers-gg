import { Loadout } from './loadout';

export type GearSlot = keyof Loadout<string>;

export const convertToGearSlotType = (gearSlot: GearSlot | string): string => {
    switch (gearSlot) {
      case 'minorArtifact1':
      case 'minorArtifact2':
        return 'minorArtifact';
      default:
        return gearSlot;
        break
    }
  }