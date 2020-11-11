import { Component, OnInit, ChangeDetectionStrategy, Input, HostBinding } from '@angular/core';
import { NamedItem } from '@avengers-game-guide/shared/data';

@Component({
  selector: 'agg-name-description',
  templateUrl: './name-description.component.html',
  styleUrls: ['./name-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NameDescriptionComponent implements OnInit {

  @Input() namedItem: NamedItem;
  @Input() @HostBinding('class.underline') underline = false;

  constructor() { }

  ngOnInit(): void {
  }

}
