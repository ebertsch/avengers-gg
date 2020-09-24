import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroEntity } from './+state/heroes.models';

@Injectable({
  providedIn: 'root'
})
export class HeroesApiClientService {

  constructor(private http: HttpClient) { }

  getHeroes() {
    return this.http.get<HeroEntity[]>('http://localhost:3333/api/heroes')
  }

  getHero(id: string) {
    return this.http.get<HeroEntity>(`http://localhost:3333/api/heroes/${id}`)
  }
}
