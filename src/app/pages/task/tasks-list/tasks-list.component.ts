import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core'
import {AsyncPipe, DatePipe, NgForOf, NgIf} from '@angular/common'
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
import {ActivatedRoute, RouterLink} from '@angular/router'
import {TaskService} from '../task.service'
import {DestroyService} from '../../../core/utils/destroy.service'
import {takeUntil} from 'rxjs'
import {TasksCreateButtonComponent} from '../tasks-create/tasks-create-button/tasks-create-button.component'
import {ProjectEditorsAddComponent} from '../../project/project-editors-add/project-editors-add.component'
import {MatIconButton} from '@angular/material/button'
import {MatIcon} from '@angular/material/icon'
import {TaskEditorButtonComponent} from '../task-editor/task-editor-button/task-editor-button.component'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'

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

  public tasksList$ = this.taskService.tasksList$.asObservable()
  public projectInfo$ = this.taskService.projectInfo$.asObservable()
  ngOnInit() {
    this.projectId = this.route.snapshot.params['id']

    this.taskService
      .getProjectInfo(this.projectId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()

    this.taskService
      .getTasksList(this.projectId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }
}
