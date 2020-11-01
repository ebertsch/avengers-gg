import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './gear-editor-page.component.html',
  styleUrls: ['./gear-editor-page.component.scss']
})
export class GearEditorPageComponent implements OnInit {

  constructor(title: Title) {
    title.setTitle('Avengers GG | Gear | Editor')
  }

  ngOnInit(): void {
  }

}
