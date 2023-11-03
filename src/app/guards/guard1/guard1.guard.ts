import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router,NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Guard1Guard implements CanActivate {
  private profeisAuthenticated = false;
  constructor(private router: Router) {}

  setProfeAuthenticationStatus(status: boolean) {
    this.profeisAuthenticated = status;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.profeisAuthenticated) {
        return true; // Usuario autenticado, permitir el acceso.
      } else {
        return this.router.navigate(['/login']);
      }
  }
  
}
