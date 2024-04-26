import {Component} from '@angular/core'
import {RouterOutlet} from '@angular/router'
import {MatSidenav, MatSidenavContainer} from '@angular/material/sidenav'
import {NavbarComponent} from './shared/ui/navbar/navbar.component'
import {HeaderComponent} from './shared/ui/header/header.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavContainer,
    NavbarComponent,
    HeaderComponent,
    MatSidenav,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend'
}
