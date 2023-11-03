import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router,NavigationExtras } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class Guard2Guard implements CanActivate {
  private alumnoisAuthenticated = false;
  constructor(private router: Router) {}

  setAlumnoAuthenticationStatus(status2: boolean) {
    this.alumnoisAuthenticated = status2;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.alumnoisAuthenticated) {
        return true; // Usuario autenticado, permitir el acceso.
      } else {
        return this.router.navigate(['/login']);
      }
  }
  
}
