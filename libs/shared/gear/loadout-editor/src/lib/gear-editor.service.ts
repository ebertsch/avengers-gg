import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { decompressFromEncodedURIComponent, compressToEncodedURIComponent, GEAR_RARITIES } from '@avengers-game-guide/shared/data';
import { RouteSelectors } from '@avengers-game-guide/shared/router';
import { createSelector, select, Store } from '@ngrx/store';
import { find, times, add, fromPairs, toPairs, assoc, map as rmap, pick, filter, reduce, pluck, prop, values, groupBy, flatten, complement, isNil, propEq, clamp, range } from 'ramda';
import { of } from 'rxjs';
import { GearInstance, Loadout, SerializedGearInstance, SerializedLoadout } from '@avengers-game-guide/shared/gear/data-access';
import { GearSlot, GearRarityValue, GearRarity, StatField } from '@avengers-game-guide/shared/data';
import { btoa } from "abab";

import { map } from 'rxjs/operators';
import { environment } from '@avengers-game-guide/shared/environments';
import { DomSanitizer } from '@angular/platform-browser';

const toGearInstance = (source: SerializedGearInstance): GearInstance => {
  if (!source) return null;

  return {
    id: source.i,
    perk1: source.p1,
    perk2: source.p2,
    perk3: source.p3,
    powerLevel: source.pl,
    rarity: source.r as GearRarityValue,
    stat1: { stat: source.s1n as StatField, value: source.s1v },
    stat2: { stat: source.s2n as StatField, value: source.s2v },
    stat3: { stat: source.s3n as StatField, value: source.s3v }
  }
}
const toSerializedGear = (source: GearInstance): SerializedGearInstance => {
  if (!source) return null;

  return {
    i: source.id,
    p1: source.perk1,
    p2: source.perk2,
    p3: source.perk3,
    pl: source.powerLevel,
    r: source.rarity,
    s1n: source.stat1.stat,
    s1v: source.stat1.value,
    s2n: source.stat2.stat,
    s2v: source.stat2.value,
    s3n: source.stat3.stat,
    s3v: source.stat3.value
  }
}

const loadoutForQueryParam = (source: Loadout) => {
  const minimalLoadout: SerializedLoadout = {
    m: toSerializedGear(source.melee),
    d: toSerializedGear(source.defense),
    h: toSerializedGear(source.heroic),
    r: toSerializedGear(source.ranged),
    a: toSerializedGear(source.majorArtifact),
    ma1: toSerializedGear(source.minorArtifact1),
    ma2: toSerializedGear(source.minorArtifact2)
  }
  return compressToEncodedURIComponent(JSON.stringify(toPairs(minimalLoadout as any)));
}
const loadoutFromQueryParam = (source: string): Loadout => {
  const decompressed = decompressFromEncodedURIComponent(source)
  if (decompressed === '') {
    return {
      melee: null,
      defense: null,
      heroic: null,
      ranged: null,
      majorArtifact: null,
      minorArtifact1: null,
      minorArtifact2: null
    }
  }
  const minimalLoadout = fromPairs(JSON.parse(decompressed)) as unknown as SerializedLoadout;
  return {
    melee: toGearInstance(minimalLoadout.m),
    defense: toGearInstance(minimalLoadout.d),
    heroic: toGearInstance(minimalLoadout.h),
    ranged: toGearInstance(minimalLoadout.r),
    majorArtifact: toGearInstance(minimalLoadout.a),
    minorArtifact1: toGearInstance(minimalLoadout.ma1),
    minorArtifact2: toGearInstance(minimalLoadout.ma2)
  }
}
const getActiveGearProperty = (slot: string): GearSlot => {
  switch (slot) {
    case "m": return "melee"
    case "r": return "ranged"
    case "d": return "defense"
    case 'h': return "heroic"
    case 'a': return 'majorArtifact'
    case 'ma1': return 'minorArtifact1'
    case 'ma2': return 'minorArtifact2'
  }
}

const isNotNull = complement(isNil)

const getAllGearPerks = (loadout: Loadout): string[] =>
  filter(isNotNull,
    flatten(
      rmap(values,
        rmap(
          pick(['perk1', 'perk2', 'perk3']),
          filter(isNotNull, values(loadout))
        )
      )
    )
  )

const summarizeLoadout = (loadout) =>
  fromPairs(
    filter(v => v[1] !== 0 && v[0] !== 'null',
      rmap(
        v => [v[0], reduce(add, 0, pluck('value', v[1]))],
        toPairs(
          groupBy(prop('stat'),
            flatten(rmap(
              values,
              values(rmap(pick(['stat1', 'stat2', 'stat3']), filter(v => !!v, values(loadout))))
            ))
          )
        )
      )
    )
  )

@Injectable({
  providedIn: 'root'
})
export class GearEditorService {
  private activeLoadoutQueryStringSelector = createSelector(
    RouteSelectors.getMergedRoute,
    mergedRoute => `${environment.protocol}://${environment.host}${mergedRoute.url}?loadout=${<string>mergedRoute.queryParams.loadout}`
  );
  activeLoadoutQueryString$ = this.store.pipe(select(this.activeLoadoutQueryStringSelector))

  private activeLoadoutDownloadSelector = createSelector(
    RouteSelectors.getMergedRoute,
    mergedRoute => {
      const json = JSON.stringify({ hero: mergedRoute.params.heroSlug, loadout: mergedRoute.queryParams.loadout })
      return this.sanitizer.bypassSecurityTrustResourceUrl(`data:text/json;base64,${btoa(json)}`);
    }
  );
  loadoutDownload$ = this.store.pipe(select(this.activeLoadoutDownloadSelector))

  private loadoutQueryParamsSelector = createSelector(
    RouteSelectors.getMergedRoute,
    mergedRoute => <string>mergedRoute.queryParams.loadout
  );  
  activeLoadoutQueryParam$ = this.store.pipe(select(this.loadoutQueryParamsSelector))

  private loadoutSelector = createSelector(
    this.loadoutQueryParamsSelector,
    loadoutQueryString => loadoutFromQueryParam(loadoutQueryString)
  );
  activeLoadout$ = this.store.pipe(select(this.loadoutSelector))
  activeLoadoutSummary$ = this.store.pipe(
    select(this.loadoutSelector),
    map(summarizeLoadout)
  )
  activeLoadoutGearPerks$ = this.store.pipe(
    select(this.loadoutSelector),
    map(getAllGearPerks)
  )

  activeGearSlotSelector = createSelector(
    RouteSelectors.getMergedRoute,
    route => getActiveGearProperty(route.queryParams.g)
  )
  activeGearSelector = createSelector(
    this.loadoutSelector,
    this.activeGearSlotSelector,
    (loadout, gearSlot) => loadout[gearSlot]
  )
  getLoadoutViewerView = createSelector(
    RouteSelectors.getMergedRoute,
    mergedRoute => <string>mergedRoute.queryParams.v || 'summary'
  );
  loadoutViewerView$ = this.store.pipe(select(this.getLoadoutViewerView));
  activeGearInstance$ = this.store.pipe(select(this.activeGearSelector));
  activeGearSlot$ = this.store.pipe(select(this.activeGearSlotSelector));

  constructor(private router: Router, private store: Store, private sanitizer: DomSanitizer) { }

  getGearRarity(value: GearRarityValue) {
    return find(propEq('id', value), GEAR_RARITIES) as GearRarity
  }

  getPowerLevels(gearSlot: GearSlot) {
    if (gearSlot === 'majorArtifact')
      return of(times(value => ({ id: value + 1, label: `${value + 1}` }), 10).reverse())

    return of(times(value => ({ id: value + 1, label: `${value + 1}` }), 140).reverse())
  }

  has3Stats(gear: GearInstance) {
    if (gear.stat3.stat) {
      return true
    }
    return false
  }

  getAttributeValueRange(gear: GearInstance) {
    const gearRarity: GearRarity = this.getGearRarity(gear.rarity)
    if (!gearRarity) return { high: 1, low: 1 }

    const powerLevelModifier = this.has3Stats(gear) ? gearRarity.modifier3 : gearRarity.modifier2;

    const high = 65//clamp(1, 65, Math.floor(gear.powerLevel * powerLevelModifier))
    const low = 1//clamp(1, 65, high - 10)

    return { high, low }
  }

  getStatValues$(gear: GearInstance) {
    const attributeRanges = this.getAttributeValueRange(gear);
    const rangeArray = range(attributeRanges.low, attributeRanges.high + 1).reverse();

    return of(rangeArray)
  }

  getRarityValues() {
    return of(GEAR_RARITIES);
  }

  getStatKeys() {
    return of([
      { id: 'might', title: 'Might' },
      { id: 'precision', title: 'Precision' },
      { id: 'resolve', title: 'Resolve' },
      { id: 'resilience', title: 'Resilience' },
      { id: 'proficiency', title: 'Proficiency' },
      { id: 'valor', title: 'Valor' },
      { id: 'intensity', title: 'Intensity' },
    ])
  }

  save(gearSlot: GearSlot, gearInstance: GearInstance, loadout: Loadout) {
    const modifiedLoadout = assoc(gearSlot, gearInstance, loadout)
    const minimalLoadout = loadoutForQueryParam(modifiedLoadout);
    this.router.navigate([], {
      queryParams: {
        v: 'viewer',
        loadout: minimalLoadout
      },
      queryParamsHandling: 'merge'
    });
  }

  remove(gearSlot: GearSlot, loadout: Loadout) {
    const modifiedLoadout = assoc(gearSlot, <GearInstance>null, loadout)
    const minimalLoadout = loadoutForQueryParam(modifiedLoadout);
    this.router.navigate([], {
      queryParams: {
        v: 'summary',
        loadout: minimalLoadout
      },
      queryParamsHandling: 'merge'
    });
  }

}

