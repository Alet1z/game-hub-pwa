import { Routes } from '@angular/router';
import page404Component from './pages/page404/page404.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component'),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: 'main',
    loadComponent: () => import('./pages/main/main.component'),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component'),
  },
   {
    path: 'product',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/product/product.component'),
  },
  {
    path: 'product/:id',
     canActivate: [authGuard],
    loadComponent: () => import('./pages/product/product.component'),
  },
  {
    path: 'not-found',
    component: page404Component,
  },
  { // Esta debe ser la última ruta
    path: '**',
    redirectTo: '/not-found',
  },
];