import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './gear-builder-page.component.html',
  styleUrls: ['./gear-builder-page.component.scss']
})
export class GearBuilderPageComponent implements OnInit {

  constructor(title: Title) {
    title.setTitle('Avengers GG | Gear | Editor')
  }

  ngOnInit(): void {
  }

}
