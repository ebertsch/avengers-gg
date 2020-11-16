import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'agg-gear-viewer-action',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./gear-viewer-action.component.scss']
})
export class GearViewerActionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
