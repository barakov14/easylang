import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
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
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {Project} from '../../../core/api-types/project'

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
export class NavbarComponent {
  @Input() projects!: Project[] | null | undefined
  @Input() start!: MatDrawer
  showDropdown: boolean = false

  toggleDropdown() {
    this.showDropdown = !this.showDropdown
  }
}
