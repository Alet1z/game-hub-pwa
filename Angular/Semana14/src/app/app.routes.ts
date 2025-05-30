import { Routes } from '@angular/router';
import { Page404Component } from './pages/page404/page404.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: '/about',
        pathMatch: 'full'
    },
    {
        path: 'dices-game',
        // loadComponent: () => import('./pages/dices-game/dices-game.component').then(c => c.DicesGameComponent)
        loadComponent: () => import('./pages/dices-game/dices-game.component')
    }
    ,
    {
        path: 'about',
        loadComponent: () => import('./pages/about/about.component')
    }
    ,
    {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.component')
    },
    {
        path: 'user',
        loadComponent: () => import('./pages/user/user.component')
    },
    {
        path: 'page404',
        component: Page404Component
    }
    ,{ // Debe ser la última ruta
        path: '**',
        redirectTo: '/page404'
    }
];
