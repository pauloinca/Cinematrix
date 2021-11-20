import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  readonly APIUrl = 'http://localhost:5212/api';

  constructor(private http: HttpClient) { }

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
