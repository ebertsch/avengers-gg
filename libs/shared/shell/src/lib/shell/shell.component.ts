import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'avengers-game-guide-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
