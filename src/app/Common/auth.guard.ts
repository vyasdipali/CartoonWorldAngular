import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { InterceptorTokenService } from './interceptor-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private isFirstVisit: boolean = true;

  constructor(private router: Router, private authService: InterceptorTokenService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.isFirstVisit) {
      this.isFirstVisit = false; // Set to false after the first visit
      return true; // Allow access to any route on the first visit
    }

    if (this.authService.getToken()) {
      return true;
    }

    this.router.navigate(['/SingUp']);
    return false;
  }

}
