import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core'
import {MatButton, MatIconButton} from '@angular/material/button'
import {ProjectService} from '../project/project.service'
import {
  AsyncPipe,
  NgClass,
  NgIf,
  NgOptimizedImage,
  NgStyle,
} from '@angular/common'
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card'
import {MatDivider} from '@angular/material/divider'
import {MatIcon} from '@angular/material/icon'
import {RouterLink} from '@angular/router'
import {ProjectCreateButtonComponent} from '../project/project-create/project-create-button/project-create-button.component'
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {ProfileService} from '../profile/services/profile.service'

@Component({
  selector: 'dashboard',
  standalone: true,
  imports: [
    MatButton,
    AsyncPipe,
    MatCard,
    MatCardTitle,
    MatCardHeader,
    MatCardContent,
    MatDivider,
    MatCardActions,
    MatCardSubtitle,
    MatIconButton,
    MatIcon,
    RouterLink,
    NgOptimizedImage,
    NgStyle,
    NgClass,
    ProjectCreateButtonComponent,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    NgIf,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private readonly projectService = inject(ProjectService)
  private readonly profileService = inject(ProfileService)
  private readonly destroyRef = inject(DestroyRef)
  public projectsList$ = this.projectService.projectsList$.asObservable()
  public user$ = this.profileService.user.asObservable()

  ngOnInit() {
    this.projectService
      .getProjectsList()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }

  deleteProject(id: number) {
    this.projectService
      .deleteProject(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }
}
