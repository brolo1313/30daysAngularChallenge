import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/drum/drum.component').then((m) => m.DrumComponent)
    }
];
