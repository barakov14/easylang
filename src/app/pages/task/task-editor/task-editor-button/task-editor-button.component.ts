import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
} from '@angular/core'
import {AsyncPipe, NgIf} from '@angular/common'
import {MatButton} from '@angular/material/button'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {TaskResponsibleDialogComponent} from '../../task-responsible/task-responsible-dialog/task-responsible-dialog.component'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {User} from '../../../../core/api-types/user'
import {ProfileService} from '../../../profile/services/profile.service'
import {TaskEditorDialogComponent} from '../task-editor-dialog/task-editor-dialog.component'
import {TaskService} from '../../task.service'

@Component({
  selector: 'task-editor-button',
  standalone: true,
  imports: [AsyncPipe, MatButton, NgIf],
  templateUrl: './task-editor-button.component.html',
  styleUrl: './task-editor-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskEditorButtonComponent implements OnInit {
  public dialog = inject(MatDialog)
  private readonly destroyRef = inject(DestroyRef)

  private readonly profileService = inject(ProfileService)
  private readonly taskService = inject(TaskService)

  @Input({required: true}) projectId!: number

  public role = this.profileService.user.asObservable()

  openAddEditorDialog() {
    const dialogRef: MatDialogRef<TaskEditorDialogComponent> = this.dialog.open(
      TaskEditorDialogComponent,
      {
        hasBackdrop: true,
      },
    )
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: User) => {
        if (data) {
          this.taskService
            .setProjectEditor(this.projectId, data.id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe()
        }
      })
  }

  ngOnInit() {
    this.taskService
      .getProjectInfo(this.projectId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }
}
