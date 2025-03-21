import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'drum',
        loadComponent: () => import('./components/drum/drum.component').then((m) => m.DrumComponent)
    },
    {
        path: 'rate-form',
        loadComponent: () => import('./components/rate-form/rate-form.component').then((m) => m.RateFormComponent)
    },

    { path: '', redirectTo: '', pathMatch: 'full' },


];
