import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent implements OnInit {

  constructor(title: Title) {
    title.setTitle('`Avengers GG | 404 Page Not Found')
  }

  ngOnInit(): void {
  }

}
