import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core'
import {
  AsyncPipe,
  DatePipe,
  NgClass,
  NgForOf,
  NgIf,
  NgOptimizedImage,
} from '@angular/common'
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table'
import {MatFormField, MatLabel, MatSuffix} from '@angular/material/form-field'
import {MatInput} from '@angular/material/input'
import {MatPaginator} from '@angular/material/paginator'
import {ActivatedRoute, RouterLink, RouterLinkActive} from '@angular/router'
import {TaskService} from '../task.service'
import {DestroyService} from '../../../core/utils/destroy.service'
import {debounceTime, takeUntil} from 'rxjs'
import {TasksCreateButtonComponent} from '../tasks-create/tasks-create-button/tasks-create-button.component'
import {ProjectEditorsAddComponent} from '../../project/project-editors-add/project-editors-add.component'
import {MatIconButton} from '@angular/material/button'
import {MatIcon} from '@angular/material/icon'
import {TaskEditorButtonComponent} from '../task-editor/task-editor-button/task-editor-button.component'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {MatCard} from '@angular/material/card'
import {BackendErrorsComponent} from '../../../shared/ui/backend-errors/backend-errors.component'
import {NgxPaginationModule} from 'ngx-pagination'
import {FormControl, ReactiveFormsModule} from '@angular/forms'
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu'

@Component({
  selector: 'tasks-list',
  standalone: true,
  imports: [
    DatePipe,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFormField,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatInput,
    MatLabel,
    MatPaginator,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    RouterLink,
    AsyncPipe,
    NgForOf,
    NgIf,
    TasksCreateButtonComponent,
    ProjectEditorsAddComponent,
    MatIconButton,
    MatIcon,
    MatSuffix,
    TaskEditorButtonComponent,
    NgOptimizedImage,
    MatCard,
    NgClass,
    BackendErrorsComponent,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    RouterLinkActive
  ],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TaskService],
})
export class TasksListComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef)
  private readonly taskService = inject(TaskService)
  private readonly route = inject(ActivatedRoute)

  public projectId!: number

  public tasksList$ = this.taskService.filteredTasksList$
  public projectInfo$ = this.taskService.projectInfo$
  public projectEditors$ = this.taskService.projectEditors$

  public errors$ = this.taskService.errors$

  filter = new FormControl('')

  sortByStatus = new FormControl('')

  constructor() {
    this.filter.valueChanges
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe((v) => {
        this.taskService.filterTasks(v as string)
      })

    this.sortByStatus.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((v) => {
        this.taskService.sortTasksByStatus(v as string)
      })
  }

  p: number = 1
  ngOnInit() {
    this.route.params
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((v) => {
        const projectId = v['id']
        this.taskService
          .getProjectInfo(projectId)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe()

        this.taskService
          .getTasksList(projectId)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe()

        this.projectId = projectId
      })
  }

  onSort(sort: string) {
    this.sortByStatus.setValue(sort)
  }

  protected readonly Math = Math
}
