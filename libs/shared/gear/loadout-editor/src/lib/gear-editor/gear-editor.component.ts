import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'agg-gear-editor',
  templateUrl: './gear-editor.component.html',
  styleUrls: ['./gear-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GearEditorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
