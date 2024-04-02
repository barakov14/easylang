import { ChangeDetectionStrategy, Component } from '@angular/core';
import {HeaderComponent} from "../../shared/ui/header/header.component";
import {MatSidenavContainer} from "@angular/material/sidenav";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    HeaderComponent,
    MatSidenavContainer,
    RouterOutlet
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {

}
