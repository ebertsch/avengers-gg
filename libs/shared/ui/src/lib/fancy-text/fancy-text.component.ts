import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'agg-fancy-text, .fancy-text',
  template: `<ng-content></ng-content>`,
  styleUrls: ['./fancy-text.component.scss']
})
export class FancyTextComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
