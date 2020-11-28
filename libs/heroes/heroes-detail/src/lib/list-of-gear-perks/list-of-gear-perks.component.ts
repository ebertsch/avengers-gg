import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';


@Component({
  selector: 'agg-list-of-gear-perks',
  templateUrl: './list-of-gear-perks.component.html',
  styleUrls: ['./list-of-gear-perks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListOfGearPerksComponent implements OnInit {

  @Input() value;

  constructor() { }

  ngOnInit(): void {
  }

}
