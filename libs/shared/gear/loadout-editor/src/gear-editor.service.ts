import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { decompressFromEncodedURIComponent, compressToEncodedURIComponent } from '@avengers-game-guide/shared/data';
import { RouteSelectors } from '@avengers-game-guide/shared/router';
import { createSelector, select, Store } from '@ngrx/store';
import { times, add, values, map as rMap, fromPairs, toPairs } from 'ramda';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { GearTemplate, GearRarity, MinimalGear } from './lib/types';

const gearFromQueryParam = (source: string) => {
  const decompressed = decompressFromEncodedURIComponent(source)
  const minimalGear = fromPairs(JSON.parse(decompressed)) as unknown as MinimalGear;
  return {
    id: minimalGear.i,
    perk1: minimalGear.p1,
    perk2: minimalGear.p2,
    perk3: minimalGear.p3,
    powerLevel: minimalGear.pl,
    rarity: minimalGear.r,
    slot: minimalGear.s,
    stat1: {stat: minimalGear.s1n, value: minimalGear.s1v},
    stat2: {stat: minimalGear.s2n, value: minimalGear.s2v},
    stat3: {stat: minimalGear.s3n, value: minimalGear.s3v}
  } as GearTemplate
}

const gearForQueryParam = (source: GearTemplate) => {
  const minimalGear: MinimalGear = {
    i: source.id,
    p1: source.perk1,
    p2: source.perk2,
    p3: source.perk3,
    pl: source.powerLevel,
    r: source.rarity,
    s: source.slot,
    s1n: source.stat1.stat,
    s1v: source.stat1.value,
    s2n: source.stat2.stat,
    s2v: source.stat2.value,
    s3n: source.stat3.stat,
    s3v: source.stat3.value,
  }
  return compressToEncodedURIComponent(JSON.stringify(toPairs(minimalGear as any)));
}

@Injectable({
  providedIn: 'root'
})
export class GearEditorService {

  private getGearSelector = createSelector(
    RouteSelectors.getMergedRoute,
    (mergedRoute, props) => {
      return <string>mergedRoute.queryParams[props.slot]
    }
  );

  getGearFromUrl = (slot: string) => this.store.pipe(
    select(this.getGearSelector, { slot }),
    map(s => gearFromQueryParam(s))
  )

  constructor(private router: Router, private store: Store) { }

  getPowerLevels() { return of(times(add(130), 11)) }

  getStatValues(gear: GearTemplate) {
    const statIncrease = 11;
    let statFloor;
    switch(gear.rarity) {
      case GearRarity.Exotic: statFloor = 45; break;
      case GearRarity.Legendary: statFloor = 35; break;
      default : statFloor = 30; break;
    }

    return of(times(add(statFloor), statIncrease))
  }

  getRarityValues() {
    return of(rMap(rarity => ({ id: rarity, label: rarity }), values(GearRarity)));
  }

  getStatKeys() {
    return of([
      {id: 'might', label: 'Might'},
      {id: 'precision', label: 'Precision'},
      {id: 'resolve', label: 'Resolve'},
      {id: 'resilience', label: 'Resilience'},
      {id: 'proficiency', label: 'Proficiency'},
      {id: 'valor', label: 'Valor'}
    ])
  }

  save(gearInstance: GearTemplate) {
    const minimalGear = gearForQueryParam(gearInstance);
    this.router.navigate([], {
        queryParams: { [gearInstance.slot]: minimalGear },
        queryParamsHandling: 'merge'
    });
  }
}

