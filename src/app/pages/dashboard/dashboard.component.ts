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
  NgForOf,
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
import {MatProgressBar} from '@angular/material/progress-bar'
import {BackendErrorsComponent} from '../../shared/ui/backend-errors/backend-errors.component'
import {NgxPaginationModule} from 'ngx-pagination'
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field'
import {MatInput} from '@angular/material/input'
import {FormControl, ReactiveFormsModule} from '@angular/forms'
import {debounceTime} from 'rxjs'
import {select, Store} from '@ngrx/store'
import {selectProjectsList} from '../../core/+state/global.selectors'
import {globalActions} from '../../core/+state/global.actions'

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
    MatProgressBar,
    BackendErrorsComponent,
    NgxPaginationModule,
    NgForOf,
    MatFormField,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  private readonly projectService = inject(ProjectService)
  private readonly profileService = inject(ProfileService)
  private readonly destroyRef = inject(DestroyRef)
  private readonly store = inject(Store)

  public projectsList$ = this.store.pipe(select(selectProjectsList))

  public user$ = this.profileService.user.asObservable()
  public errors$ = this.projectService.errors$

  filter = new FormControl('')

  sortByStatus = new FormControl('')

  p: number = 1

  constructor() {
    this.filter.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe((v) => {
        this.store.dispatch(
          globalActions.filterProjectsList({emit: v as string}),
        )
      })

    this.sortByStatus.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((v) => {
        this.store.dispatch(globalActions.sortProjectsList({emit: v as string}))
      })
  }

  ngOnInit() {
    this.store.dispatch(globalActions.loadProjectsList())
  }

  deleteProject(id: number) {
    this.store.dispatch(globalActions.deleteProject({projectId: id}))
  }

  onSort(sort: string) {
    this.sortByStatus.setValue(sort)
  }
}
