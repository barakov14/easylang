import {ChangeDetectionStrategy, Component, DestroyRef, Input, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ProfileService} from "../../../profile/services/profile.service";
import {
  ProjectCreateDialogComponent
} from "../../../project/project-create/project-create-dialog/project-create-dialog.component";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {CreateProject} from "../../../../core/api-types/project";
import {TaskService} from "../../task.service";
import {TasksCreateDialogComponent} from "../tasks-create-dialog/tasks-create-dialog.component";
import {CreateTask} from "../../../../core/api-types/task";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'tasks-create-button',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './tasks-create-button.component.html',
  styleUrl: './tasks-create-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksCreateButtonComponent {
  public dialog = inject(MatDialog)
  private readonly destroyRef = inject(DestroyRef)
  private readonly taskService = inject(TaskService)

  private readonly authService = inject(ProfileService)
  private readonly route = inject(ActivatedRoute)

  @Input({required: true}) projectId!: number

  public role = this.authService.currentUserRole.asObservable()

  openAddTaskDialog() {
    const dialogRef: MatDialogRef<TasksCreateDialogComponent> = this.dialog.open(TasksCreateDialogComponent)
    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (data: CreateTask) => {
          this.taskService.addTask(data, this.projectId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe()
        }
      )
  }
}
