import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: 'drum',
        loadComponent: () => import('./components/drum/drum.component').then((m) => m.DrumComponent)
    },
    {
        path: 'rate',
        loadComponent: () => import('./components/rate/rate.component').then((m) => m.RateComponent)
    },

    { path: '', redirectTo: '', pathMatch: 'full' },


];
