import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { TeamService } from '@avengers-game-guide/shared/teams/data-access'

@Component({

  // tslint:disable-next-line: component-selector
  selector: 'agg-navigation-bar',
  templateUrl: 'navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationBarComponent implements OnInit {

  constructor(public team: TeamService) {
    console.log('team', team)
  } 

  ngOnInit(): void {
  }

}
