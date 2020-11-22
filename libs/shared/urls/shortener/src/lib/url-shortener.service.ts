import { Injectable } from '@angular/core';
import { ShortUrlService } from './short-urls.service';
import { map, take } from 'rxjs/operators';
import { environment } from '@avengers-game-guide/shared/environments';
import { assoc } from 'ramda';

@Injectable({
  providedIn: 'root'
})
export class UrlShortenerService {
  constructor(private shortUrlService: ShortUrlService) {
  }

  public shorten(heroId: string, view: string, loadout: string) {
    this.shortUrlService.clearCache();
    return this.shortUrlService.add({ heroId, view, loadout }).pipe(
      map(surl => {
        return assoc('url', `${environment.protocol}://${environment.host}/b/${surl.id}`, surl)
      }),
      take(1)
    )
  }
}
