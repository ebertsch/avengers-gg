import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero, HeroService } from '@avengers-game-guide/shared/heroes/data-access';

@Component({
  selector: 'agg-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {
  
  apiLoaded = false;
  hero$: Observable<Hero>;

  constructor(private heroesService: HeroService) { }

  ngOnInit(): void {
    this.hero$ = this.heroesService.selected$;
    this.loadYoutubeApi();
  }

  loadYoutubeApi() {
    if (!this.apiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      this.apiLoaded = true;
    }
  }
}
