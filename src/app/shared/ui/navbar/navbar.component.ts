import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import {MatIcon} from '@angular/material/icon'
import {MatButton, MatIconButton} from '@angular/material/button'
import {MatDrawer, MatSidenav} from '@angular/material/sidenav'
import {RouterLink} from '@angular/router'
import {MatMenuModule} from '@angular/material/menu'
import {MatListModule} from '@angular/material/list'
import {MatSlideToggle} from '@angular/material/slide-toggle'
import {MatLabel} from '@angular/material/form-field'
import {FormsModule} from '@angular/forms'
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion'
import {
  MatTree,
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeModule,
  MatTreeNode,
} from '@angular/material/tree'
import {FlatTreeControl} from '@angular/cdk/tree'
import {AsyncPipe, NgForOf, NgIf} from '@angular/common'
import {ProjectService} from '../../../pages/project/project.service'

@Component({
  selector: 'ui-navbar',
  standalone: true,
  imports: [
    MatMenuModule,
    MatIcon,
    MatIconButton,
    MatButton,
    MatListModule,
    RouterLink,
    MatSlideToggle,
    MatLabel,
    FormsModule,
    MatTreeModule,
    NgIf,
    NgForOf,
    AsyncPipe,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  private readonly projectService = inject(ProjectService)
  public readonly projectsList$ =
    this.projectService.lastProjectsList$.asObservable()
  @Input() start!: MatDrawer
  showDropdown: boolean = false

  toggleDropdown() {
    this.showDropdown = !this.showDropdown
  }

  ngOnInit() {
    this.projectService.getLastProjects()
  }
}
