import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  template: `
  <nav>
      <a routerLink="/dashboard" >Dashboard</a>
      <a routerLink="/heroes">Heroes</a>
  </nav>
  <h1>{{title}}</h1>
  <router-outlet></router-outlet>
  `,
  styleUrls: [ '../style/app.component.css' ]
})


export class AppComponent{
  title = 'Tour of Heroes';
}
