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

  private role: string[] = [];

  constructor(private router: Router, private auth: AuthService,
    private tokenStorage: TokenStorageService) {
  }

  canActivate(next: ActivatedRouteSnapshot) {
    const token = this.tokenStorage.getToken();

    if (token) {
      const user = this.tokenStorage.getUser();
      console.log(user);
      this.role = user.NivelAcesso;
      const allowedRoles = next.data.allowedRoles;
      console.log("roles" + this.role);
      console.log("allowed:" + allowedRoles);
      if (allowedRoles.includes(this.role)) {
        console.log("trueee");
        return true;
      }
    }

    this.router.navigate(["login"]);
    return false;
  }

}
