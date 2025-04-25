import { Component, inject } from '@angular/core';
import { routes } from '../../../app.routes';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './navbar.component.html',

})
export class NavbarComponent {
  router = inject(Router);
  routes= routes
  .filter(route => route.path !== '**')
  .map(route => ({
    path: route.path,
    title: `${route.title ?? 'Maps en angular'} `
  }))

  pageTitle$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    tap(
      event => console.log('event', event)
    ),
    map(
      event => event.url
    ),
    map(
      url => this.routes.find(route => `/${route.path}` === url)?.title ?? 'fullScreen Map'
    ),
  )
}
