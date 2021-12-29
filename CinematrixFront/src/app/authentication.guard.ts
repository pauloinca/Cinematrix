import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { TokenStorageService } from './services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  private roles: string[] = [];

  constructor(private router: Router, private auth: AuthService,
    private tokenStorage: TokenStorageService) {
  }

  canActivate(next: ActivatedRouteSnapshot) {
    const token = this.tokenStorage.getToken();

    if (token) {
      const user = this.tokenStorage.getUser();
      this.roles = user.user.NivelAcesso;
      const allowedRoles = next.data.allowedRoles;
      if (allowedRoles.includes(this.roles))
        return true;
    }

    this.router.navigate(["login"]);
    return false;
  }

}
