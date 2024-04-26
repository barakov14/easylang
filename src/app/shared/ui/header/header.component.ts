import {ChangeDetectionStrategy, Component, Input} from '@angular/core'
import {MatIcon} from '@angular/material/icon'
import {MatToolbar} from '@angular/material/toolbar'
import {RouterLink} from '@angular/router'
import {MatButton, MatIconButton} from '@angular/material/button'
import {MatDrawer, MatSidenav} from '@angular/material/sidenav'

@Component({
  selector: 'header',
  standalone: true,
  imports: [MatIcon, MatToolbar, RouterLink, MatButton, MatIconButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() start!: MatDrawer
}
