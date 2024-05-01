import {ChangeDetectionStrategy, Component} from '@angular/core'
import {MatButton} from '@angular/material/button'
import {RouterLink} from '@angular/router'

@Component({
  selector: 'pages-not-found',
  standalone: true,
  imports: [MatButton, RouterLink],
  templateUrl: './pages-not-found.component.html',
  styleUrl: './pages-not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagesNotFoundComponent {}
