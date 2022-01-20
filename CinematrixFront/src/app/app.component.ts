import { Component } from '@angular/core';
import { SharedService } from './services/shared.service';
import { Router } from '@angular/router'
import { TokenStorageService } from './services/token-storage.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  title = 'Cinematrix';
  isAuthenticated = false;
  roles: string[] = [];

  async logout(): Promise<void> {
    this.tokenStorage.signOut();
    window.location.reload();

  }
  async login(): Promise<void> {
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });

  }



  constructor(private router: Router, private tokenStorage: TokenStorageService) {
    // this.shared.isUserAuthenticated().subscribe(x => this.isAuthenticated = x);
  }

  ngOnInit() {
    // console.log("app-component ngOnInit");
    // console.log("token: " + this.tokenStorage.getToken() + "\n\n");
    if (this.tokenStorage.getToken()) {
      // console.log(this.tokenStorage.getToken());
      this.isAuthenticated = true;
      console.log(this.tokenStorage.getUser());
      this.roles = this.tokenStorage.getUser().NivelAcesso;
    }
    // this.isAuthenticated().sub = this.shared.isUserAuthenticated();
    // this.shared.getFilmeList().subscribe((x) => {
    //   console.log(x[0]);
    // });
  }
}
