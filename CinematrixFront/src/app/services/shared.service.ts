import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  readonly APIUrl = 'http://localhost:5212/api';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  isUserAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return new Observable(obs => obs.next(true))
    }
    else {
      return new Observable(obs => obs.next(false))
    }
  }

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
