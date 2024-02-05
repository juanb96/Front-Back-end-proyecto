import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proyectFront';

  pageTitle: string = 'Pagina de inicio';

  updatePageTitle(title: string) {
    this.pageTitle = title;
  }
}
