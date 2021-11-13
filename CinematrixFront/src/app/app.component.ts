import { Component } from '@angular/core';
import { SharedService } from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Cinematrix';
  filme: string = '';

  constructor(private shared: SharedService) {}

  ngOnInit() {
    this.shared.getFilmeList().subscribe((x) => {
      console.log(x[0]);
    });
  }
}
