import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  invalidLogin = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  login(form: NgForm) {
    const credentials = JSON.stringify(form.value);
    this.http
      .post('http://localhost:5212/api/auth/login', credentials, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
        }),
      })
      .subscribe(
        (response) => {
          const token = (<any>response).token;
          localStorage.setItem('jwt', token);
          this.invalidLogin = false;
          this.router.navigate(['/']);
        },
        (err) => {
          this.invalidLogin = true;
        }
      );
  }

  logOut() {
    localStorage.removeItem('jwt');
  }
}
