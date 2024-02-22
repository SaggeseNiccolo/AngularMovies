import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MovieInfoComponent } from './components/movie-info/movie-info.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'info',
    component: MovieInfoComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
