import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core'
import {ActivatedRoute, RouterLink, RouterLinkActive} from '@angular/router'
import {TaskService} from '../task.service'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {AsyncPipe, DatePipe, NgClass, NgForOf, NgIf} from '@angular/common'
import {ProjectEditorsAddComponent} from '../../project/project-editors-add/project-editors-add.component'
import {MatButton, MatFabButton} from '@angular/material/button'
import {TaskResponsibleButtonComponent} from '../task-responsible/task-responsible-button/task-responsible-button.component'
import {MatIcon} from '@angular/material/icon'
import {ProfileService} from '../../profile/services/profile.service'
import {TaskDeadlineDialogComponent} from '../task-deadline-dialog/task-deadline-dialog.component'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {SetDeadline} from '../../../core/api-types/task'
import {MatCard} from '@angular/material/card'
import {BackendErrorsComponent} from '../../../shared/ui/backend-errors/backend-errors.component'
import {NgxPaginationModule} from 'ngx-pagination'

@Component({
  selector: 'task-detail',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    AsyncPipe,
    NgForOf,
    ProjectEditorsAddComponent,
    DatePipe,
    MatButton,
    TaskResponsibleButtonComponent,
    MatFabButton,
    MatIcon,
    NgClass,
    MatCard,
    BackendErrorsComponent,
    NgxPaginationModule,
    RouterLinkActive
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskDetailComponent implements OnInit {
  private readonly taskService = inject(TaskService)
  private readonly profileService = inject(ProfileService)
  private readonly destroyRef = inject(DestroyRef)
  private readonly route = inject(ActivatedRoute)
  private readonly dialog = inject(MatDialog)
  public taskDetail$ = this.taskService.taskDetail$.asObservable()
  public submissions$ = this.taskService.submissions$.asObservable()
  public errors$ = this.taskService.errors$
  public user$ = this.profileService.user.asObservable()
  public projectId!: number
  public taskId!: number

  p: number = 1

  constructor() {
    this.projectId = this.route.snapshot.params['id']
    this.taskId = this.route.snapshot.params['taskId']
  }
  ngOnInit() {
    this.taskService
      .getTaskDetail(this.projectId, this.taskId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
    this.taskService
      .getTaskSubmissions(this.projectId, this.taskId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
    this.taskService
      .getEditorsList()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }

  onSetDeadline() {
    const dialogRef: MatDialogRef<TaskDeadlineDialogComponent> =
      this.dialog.open(TaskDeadlineDialogComponent)
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((deadline: Date) => {
        const data: SetDeadline = {
          deadline,
        }
        this.taskService
          .setTaskDeadline(this.projectId, this.taskId, data)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe()
      })
  }
}
