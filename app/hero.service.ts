import { Injectable } from "@angular/core";
// import { HEROES } from './mock-heroes';

import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';


import { Hero } from './hero';

@Injectable()

export class HeroService {

  // without http call
  // getHeroes(): Promise<Hero[]> {
  // return Promise.resolve(HEROES);
  // }

  // private heroesUrl = 'app/heroes';
  private heroesUrl = 'app/heroes';

  constructor(private http: Http) {

  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }


  getHeroes(): Promise<Hero[]> {
    return this.http.get(this.heroesUrl)
      .toPromise()
      .then(response => response.json().data as Hero[])
      .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    return this.getHeroes()
      .then(
      heroes => heroes.find(hero => hero.id === id)
      );
  }


  getHeroesSlowly(): Promise<Hero[]> {
    return new Promise<Hero[]>(resolve =>
      setTimeout(resolve, 2000)) // delay 2 seconds
      .then(() => this.getHeroes());
  }

  update(hero: Hero): Promise<Hero> {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http
      .put(url, JSON.stringify(hero), { headers: this.headers })
      .toPromise()
      .then(() => hero)
      .catch(this.hendleError);
  }

  create(name: String): Promise<Hero> {
    return this.http
      .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
      .toPromise()
      .then(res => res.json().data)
      .catch(this.handleError);
  }

  delete(id: number): Promise<Hero>{
    const url = `${this.heroesUrl}/${id}`;

    return this.http
      .delete(url, {headers: this.headers})
      .toPromise()
      .then(res => null)
      .catch(this.handleError);
  }
}
