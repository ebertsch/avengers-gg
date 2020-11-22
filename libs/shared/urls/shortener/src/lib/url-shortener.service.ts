import { Injectable } from '@angular/core';
import { ShortUrlService } from './short-urls.service';
import { map, take } from 'rxjs/operators';
import { environment } from '@avengers-game-guide/shared/environments';
import { assoc } from 'ramda';
import { loadoutForQueryParam } from '@avengers-game-guide/shared/gear/loadout-editor'
import { ShortUrl } from './models/short-url';

@Injectable({
  providedIn: 'root'
})
export class UrlShortenerService {
  constructor(private shortUrlService: ShortUrlService) {
  }

  public shorten(url: string) {
    this.shortUrlService.clearCache();
    const entry: ShortUrl = { url }
    return this.shortUrlService.add(entry).pipe(
      map(surl => {
        return assoc('url', `${environment.protocol}://${environment.host}/b/${surl.id}`, surl)
      }),
      take(1)
    )
  }
}
