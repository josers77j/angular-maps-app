import { Routes } from '@angular/router';
import { FullscreenMapPageComponent } from './pages/fullscreen-map-page/fullscreen-map-page.component';
import { HousesPageComponent } from './pages/houses-page/houses-page.component';
import { MarkersPageComponent } from './pages/markers-page/markers-page.component';

export const routes: Routes = [
  {
    path:'fullscreen',
    component:FullscreenMapPageComponent,
    title: 'fullScreen Map'
  },
  {
    path:'houses',
    component: HousesPageComponent,
    title: 'Houses Map'
  },
  {
    path:'markers',
    component: MarkersPageComponent,
    title: 'Markers Map'
  },
  {
    path:'**',
    redirectTo:'fullscreen',
  }
];
