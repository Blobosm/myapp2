import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Guard1Guard } from './guards/guard1/guard1.guard';
import { Guard2Guard } from './guards/guard2/guard2.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./page/home/home.module').then( m => m.HomePageModule),
    canActivate: [Guard2Guard]
  },
  {
    path: 'login',
    loadChildren: () => import('./page/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home2',
    loadChildren: () => import('./page/home2/home2.module').then( m => m.Home2PageModule),
    canActivate: [Guard1Guard]
  },
  {
    path: '**',
    loadChildren: () => import('./page/page404/page404.module').then( m => m.Page404PageModule)
  },
  {
    path: 'detallecurso',
    loadChildren: () => import('./detallecurso/detallecurso.module').then( m => m.DetallecursoPageModule),
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
