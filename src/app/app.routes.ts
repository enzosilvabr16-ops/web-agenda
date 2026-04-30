import { Routes } from '@angular/router';
import { Autenticar } from './pages/autenticar/autenticar';
import { CriarConta } from './pages/criar-conta/criar-conta';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
    {
        path: 'autenticar',
        component: Autenticar
    },
    {
        path: 'criar-conta',
        component: CriarConta
    },
    {
        path: 'dashboard',
        component: Dashboard
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/autenticar'

    }
];

