import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';

import { BuildService } from '@avengers-game-guide/shared/builds/data-access';
import { SkillService, Skill } from '@avengers-game-guide/shared/skills/data-access';

import { Observable, combineLatest } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';
import { assoc, map as rMap, includes, keys, reduce, concat, find, propEq, dissoc, append } from 'ramda';
import { Dictionary } from '@ngrx/entity';
import { GearEditorService } from '@avengers-game-guide/shared/gear/loadout-editor';
import { Loadout } from '@avengers-game-guide/shared/gear/data-access';
import { PerkService } from '@avengers-game-guide/shared/perks/data-access';

type SelectableSkill = Skill & { selected?: boolean; children?: SelectableSkill[] };

@Component({
  templateUrl: './builds-view.component.html',
  styleUrls: ['./builds-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildsViewComponent implements OnInit {

  hero$: Observable<any>
  loadout$: Observable<Loadout>
  skills$: Observable<SelectableSkill[]>;
  selectedSkills$: Observable<Skill[]>;
  activeGearSlot$: Observable<string>;
  activeLoadoutPerks$: Observable<string[]>;

  selectedSkills: Dictionary<string> = {}

  constructor(
    private builds: BuildService,
    private heroes: HeroService,
    private skillService: SkillService,
    public gearEditorService: GearEditorService,
    public perkService: PerkService,
    private router: Router,
    private titleService: Title) {
  }

  ngOnInit(): void {
    this.setupSkills();
    this.loadout$ = this.gearEditorService.activeLoadout$;
    this.activeGearSlot$ = this.gearEditorService.activeGearSlot$;
    this.activeLoadoutPerks$ = this.gearEditorService.activeLoadoutGearPerks$;
  }

  setupSkills() {
    this.hero$ = this.heroes.selected$.pipe(
      tap((hero) => this.titleService.setTitle(`Avengers GG | Builder | ${hero.name}`)),
      tap(hero => {this.skillService.clearCache(); this.skillService.getWithQuery({ heroId: hero.id })}),
      tap(hero => {this.perkService.clearCache(); this.perkService.getAll()}),
      take(1),
    )

    this.skills$ = combineLatest([this.builds.selectedSkills$, this.hero$, this.skillService.entities$])
      .pipe(
        map(([selectedSkills, hero, skills]) => {
          return rMap((skill: Skill) =>
            assoc('children',
              rMap(child => assoc("selected", includes(child.id, selectedSkills || ""), child), skill.children)
              , skill)
            , skills)
        })
      )

    this.selectedSkills$ = this.skills$.pipe(
      map(skills => reduce((acc, cur) => {
        const selectedChild = find((x => x.selected), cur.children)
        if (!!selectedChild) {
          this.selectedSkills[cur.id] = selectedChild.id;
          return append(selectedChild, acc)
        }
        return acc;

      }, [] as Skill[], skills as SelectableSkill[])
      )
    )
  }

  byId(index: number, skill: Skill) {
    return skill.id
  }

  selectSkill(skill: Skill, option: Skill) {

    if (propEq(skill.id, option.id, this.selectedSkills)) {
      this.selectedSkills = dissoc(skill.id, this.selectedSkills);
    } else {
      this.selectedSkills = assoc(skill.id, option.id, this.selectedSkills);
    }

    const skills = reduce(
      (acc, val) => {
        if (val === '') return acc;
        return concat(acc, [`${val}:${this.selectedSkills[val]}`])
      }, [], keys(this.selectedSkills));

    this.router.navigate(
      [],
      {
        queryParams: { skills: skills.join(",") },
        queryParamsHandling: 'merge'
      });
  }

  restoreLoadout(file: InputEvent ) {
    const input = file.currentTarget as HTMLInputElement;
    const fileList: FileList | null = input.files;
    const reader = new FileReader();
    reader.readAsText(fileList[0], "UTF-8");
    reader.onload = evt => {
      const json = JSON.parse(evt.target.result as string);
      
      this.router.navigate(['/heroes', json.hero], {
        queryParams: { loadout: json.loadout },
        queryParamsHandling: 'merge'
      })
      input.value = ""
    } 
  }

}
