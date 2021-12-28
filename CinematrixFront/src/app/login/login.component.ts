import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  invalidLogin = false;
  form: FormGroup;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  private returnUrl: string;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, fb: FormBuilder) {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/game';

    this.form = fb.group({
      usuarioId: [0],
      nomeUsuario: ["", Validators.required],
      senha: ["", Validators.required],
      nivelAcesso: [""]
    });
  }

  async ngOnInit(): Promise<void> {
    // if (await this.authService.checkAuthenticated()) {
    //   await this.router.navigate([this.returnUrl]);
    // }
  }

  login(form: NgForm) {
    this.formSubmitAttempt = false;
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
          this.router.navigate(['/home']);
        },
        (err) => {
          this.invalidLogin = true;
        }
      );
  }

  logOut() {
    localStorage.removeItem('jwt');
  }

  async onSubmit(): Promise<void> {
    this.formSubmitAttempt = false;

    if (this.form.valid) {
      const credentials = JSON.stringify(this.form.value);
      console.log(credentials);
      this.http
        .post('http://localhost:5212/api/Auth/login', credentials, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json-patch+json',
          }),
        })
        .subscribe(
          (response) => {
            console.log('oiee');
            const token = (<any>response).token;
            localStorage.setItem('jwt', token);
            this.invalidLogin = false;
            this.router.navigate(['/home']).then(() => {
              window.location.reload();
            });
          },
          (err) => {
            console.log(err);
            this.loginInvalid = true;
          }
        );
    }
    else {
      this.formSubmitAttempt = true;
    }
  }
}
