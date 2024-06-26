import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Input,
  inject,
} from '@angular/core'
import {MatButton, MatFabButton} from '@angular/material/button'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {ProfileService} from '../../../profile/services/profile.service'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {TaskService} from '../../task.service'
import {TasksCreateDialogComponent} from '../tasks-create-dialog/tasks-create-dialog.component'
import {CreateTask} from '../../../../core/api-types/task'
import {MatIcon} from '@angular/material/icon'
import {AsyncPipe, NgIf} from '@angular/common'

@Component({
  selector: 'tasks-create-button',
  standalone: true,
  imports: [MatButton, MatFabButton, MatIcon, AsyncPipe, NgIf],
  templateUrl: './tasks-create-button.component.html',
  styleUrl: './tasks-create-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksCreateButtonComponent {
  public dialog = inject(MatDialog)
  private readonly destroyRef = inject(DestroyRef)
  private readonly taskService = inject(TaskService)

  @Input({required: true}) projectId!: number

  private readonly profileService = inject(ProfileService)

  public user$ = this.profileService.user.asObservable()

  openAddTaskDialog() {
    const dialogRef: MatDialogRef<TasksCreateDialogComponent> =
      this.dialog.open(TasksCreateDialogComponent, {
        hasBackdrop: true,
      })
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: CreateTask) => {
        this.taskService
          .addTask(data, this.projectId)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe()
      })
  }
}
