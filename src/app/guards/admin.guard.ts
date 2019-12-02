import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor (private authService : AuthService, private router : Router){}

  /*next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;*/
    
    canActivate(){
      this.authService.getCurrentUser();    
      if (this.authService.isAuth && this.authService.isAdmin) {
        return true;

      } else {
        this.router.navigate([""]);
        return false;
      }      
    }
      
}
