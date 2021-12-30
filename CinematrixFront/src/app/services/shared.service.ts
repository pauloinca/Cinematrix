import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorageService } from '../services/token-storage.service'

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  readonly APIUrl = 'http://localhost:5212/api';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private tokenStorage: TokenStorageService) { }

  isUserAuthenticated(): Observable<boolean> {
    const token = this.tokenStorage.getToken();
    // console.log(token);
    // if (token) {
    //   var ab = this.jwtHelper.decodeToken(token);
    //   console.log(ab);
    // }

    if (token) {
      return new Observable(obs => obs.next(true))
    }
    else {
      return new Observable(obs => obs.next(false))
    }
  }

  // accessLoginToken(token: string) {
  //   const check = '/users/access';
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Authorization': 'Bearer ' + token,
  //     })
  //   };
  //   return this.http.get<any>('/api' + check, httpOptions).pipe(
  //     catchError(err => this.handleError('accessLoginToken', err))
  //   );
  // }

  getFilmeList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/filme');
  }
  addFilme(val: any) {
    return this.http.post(this.APIUrl + '/filme', val);
  }
  updateFilme(val: any) {
    return this.http.put(this.APIUrl + '/filme', val);
  }
  deleteFilme(val: any) {
    return this.http.delete(this.APIUrl + '/filme/' + val);
  }
}
