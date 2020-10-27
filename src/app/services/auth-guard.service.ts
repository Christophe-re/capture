import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { isNull } from 'util';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // Récupération de l'utilisateur connecté
      const isLoggedIn = !isNull(this.authService.userIsLogged());
  
      if (!isLoggedIn) {
        // Si pas d'utilisateur connecté : redirection vers la page de login
        console.log('Vous n\'êtes pas connectés');
        this.router.navigate(['/login'], { queryParams: { redirectUrl: state.url }});
      }
      return isLoggedIn;
    }

  }