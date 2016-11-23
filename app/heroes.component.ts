import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { HeroService } from './hero.service';
import { Hero } from './hero';

@Component({
  moduleId: module.id,
  selector: 'my-heroes',
  templateUrl: '../views/heroes.component.html',
  styleUrls: ['../style/heroes.component.css']
  // providers: [HeroService]
})


export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  constructor(
    private heroService: HeroService,
    private router: Router
  ) { }
  getHeroes(): void {
    // this.heroService.getHeroes().then(heroes => this.heroes = heroes);

    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  gotoDetail(): void {
    // console.log(this.selectedHero.id);
    this.router.navigate(['/detail', this.selectedHero.id]);
  }
  add(name: String): void {
    name = name.trim();
    if (!name) { return };
    this.heroService.create(name)
      .then(hero => {
        this.heroes.push(hero);
        this.selectedHero = null;
      })
  }

  delete(hero: Hero): void {
    this.heroService.delete(hero.id)
      .then(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
  }


  ngOnInit(): void {
    this.getHeroes();
  }
}
