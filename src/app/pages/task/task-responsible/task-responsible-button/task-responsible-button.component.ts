import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
} from '@angular/core'
import {MatButton, MatFabButton} from '@angular/material/button'
import {MatIcon} from '@angular/material/icon'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {TaskService} from '../../task.service'
import {ProfileService} from '../../../profile/services/profile.service'
import {ActivatedRoute} from '@angular/router'
import {TasksCreateDialogComponent} from '../../tasks-create/tasks-create-dialog/tasks-create-dialog.component'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {CreateTask} from '../../../../core/api-types/task'
import {AsyncPipe, NgIf} from '@angular/common'
import {TaskResponsibleDialogComponent} from '../task-responsible-dialog/task-responsible-dialog.component'
import {User} from '../../../../core/api-types/user'

@Component({
  selector: 'task-responsible-button',
  standalone: true,
  imports: [MatFabButton, MatIcon, AsyncPipe, NgIf, MatButton],
  templateUrl: './task-responsible-button.component.html',
  styleUrl: './task-responsible-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskResponsibleButtonComponent {
  public dialog = inject(MatDialog)
  private readonly destroyRef = inject(DestroyRef)
  private readonly taskService = inject(TaskService)

  private readonly route = inject(ActivatedRoute)
  @Input({required: true}) projectId!: number

  @Input({required: true}) taskId!: number
  private readonly profileService = inject(ProfileService)

  public role = this.profileService.user.asObservable()

  openAddResponsibleDialog() {
    const dialogRef: MatDialogRef<TaskResponsibleDialogComponent> =
      this.dialog.open(TaskResponsibleDialogComponent, {
        hasBackdrop: true,
      })
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: User) => {
        this.taskService
          .setTranslatorToTask(this.projectId, this.taskId, data.id, data)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe()
      })
  }
}
