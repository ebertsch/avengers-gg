import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { HeroService } from '@avengers-game-guide/shared/heroes/data-access';

import { BuildService, Build } from '@avengers-game-guide/shared/builds/data-access';
import { SkillService, Skill } from '@avengers-game-guide/shared/skills/data-access';

import { Observable } from 'rxjs';
import { tap, switchMap, map, withLatestFrom } from 'rxjs/operators';
import { assoc, map as rMap, includes, mergeAll, keys, reduce, concat, find, propEq, dissoc } from 'ramda';
import { Dictionary } from '@ngrx/entity';

type SelectableSkill = Skill & { selected?: boolean; children?: SelectableSkill[] };

@Component({
  templateUrl: './builds-view.component.html',
  styleUrls: ['./builds-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BuildsViewComponent implements OnInit {

  builds$: Observable<Build[]>;
  skills$: Observable<SelectableSkill[]>;
  selectedSkills: Dictionary<string> = {}

  constructor(
    private builds: BuildService,
    private heroes: HeroService,
    private skillService: SkillService,
    private router: Router,
    private titleService: Title) {
      this.setupSkillsObservable()
  }

  setupSkillsObservable() {
    this.builds.selectedSkills$.pipe(
      withLatestFrom(this.heroes.selected$),
      tap(([skillString, selectedHero]) => this.titleService.setTitle(`Avengers GG | Builds | ${selectedHero.name}`)),
    ).subscribe(([skillString, selectedHero]) => {
      this.skillService.getWithQuery({ heroId: selectedHero.id })
      this.selectedSkills = mergeAll((skillString || '').split(',').map((kvp) => {
        const values = kvp.split(':')
        return { [values[0]]: values[1] }
      }))
    })

    this.skills$ = this.heroes.selected$.pipe(
      tap(hero => this.skillService.getWithQuery({ heroId: hero.id })),
      switchMap(() => this.skillService.entities$),
      withLatestFrom(this.builds.selectedSkills$),
      map(([skills, selectedSkillsString]) =>
        rMap((skill: Skill) =>
          assoc('children',
            rMap(child => assoc("selected", includes(child.id, selectedSkillsString || ""), child), skill.children)
            , skill)
          , skills)
      )
    )
  }

  bySkillId(index: number, skill: Skill) {
    return skill.id
  }

  ngOnInit(): void {
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

  findChild(skill: Skill, childId: string) {
    return find(child => child.id === childId, skill.children)
  }

}
