import { Component } from '@angular/core';
import { SharedService } from './services/shared.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  title = 'Cinematrix';
  isAuthenticated = false;

  async logout(): Promise<void> {
    localStorage.removeItem("jwt");
    window.location.reload();

  }
  async login(): Promise<void> {
    // localStorage.removeItem("jwt");
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });

  }



  constructor(private shared: SharedService, private router: Router) {
    this.shared.isUserAuthenticated().subscribe(x => this.isAuthenticated = x);
  }

  ngOnInit() {

    // this.isAuthenticated().sub = this.shared.isUserAuthenticated();
    // this.shared.getFilmeList().subscribe((x) => {
    //   console.log(x[0]);
    // });
  }
}
