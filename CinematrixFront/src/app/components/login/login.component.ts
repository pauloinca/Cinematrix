import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service'
import { AuthService } from '../../services/auth.service'

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
  roles: string[] = [];

  constructor(private route: ActivatedRoute, private router: Router, fb: FormBuilder,
    private tokenStorage: TokenStorageService, private authService: AuthService) {

    this.form = fb.group({
      usuarioId: [0],
      nomeUsuario: ["", Validators.required],
      senha: ["", Validators.required],
      nivelAcesso: [""]
    });

  }

  async ngOnInit(): Promise<void> {
    // if (this.tokenStorage.getToken()) {
    // this.isLoggedIn = true;
    // this.roles = this.tokenStorage.getUser().roles;
    // }
    // if (await this.authService.checkAuthenticated()) {
    //   await this.router.navigate([this.returnUrl]);
    // }
  }

  // login(form: NgForm) {
  //   this.formSubmitAttempt = false;
  //   const credentials = JSON.stringify(form.value);
  //   this.http
  //     .post('http://localhost:5212/api/auth/login', credentials, {
  //       headers: new HttpHeaders({
  //         'Content-Type': 'application/json',
  //       }),
  //     })
  //     .subscribe(
  //       (response) => {
  //         const token = (<any>response).token;
  //         localStorage.setItem('jwt', token);
  //         this.invalidLogin = false;
  //         this.router.navigate(['/home']);
  //       },
  //       (err) => {
  //         this.invalidLogin = true;
  //       }
  //     );
  // }

  onSubmit(): void {
    this.formSubmitAttempt = false;
    this.authService.login(JSON.stringify(this.form.value)).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.user);
        this.invalidLogin = false;
        // this.isLoginFailed = false;
        // this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().NivelAcesso;
        // console.log(this.roles);
        // this.reloadPage();
      },
      err => {
        console.log(err);
        this.loginInvalid = true;
        // this.errorMessage = err.error.message;
        // this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  // async onSubmit(): Promise<void> {
  //   this.formSubmitAttempt = false;

  //   if (this.form.valid) {
  //     const credentials = JSON.stringify(this.form.value);
  //     this.http
  //       .post('http://localhost:5212/api/Auth/login', credentials, {
  //         headers: new HttpHeaders({
  //           'Content-Type': 'application/json-patch+json',
  //         }),
  //       })
  //       .subscribe(
  //         (response) => {
  //           const token = (<any>response).token;
  //           localStorage.setItem('jwt', token);
  //           this.invalidLogin = false;
  //           this.router.navigate(['/home']).then(() => {
  //             window.location.reload();
  //           });
  //         },
  //         (err) => {
  //           console.log(err);
  //           this.loginInvalid = true;
  //         }
  //       );
  //   }
  //   else {
  //     this.formSubmitAttempt = true;
  //   }
  // }
}
