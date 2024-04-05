import {ChangeDetectionStrategy, Component, DestroyRef, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {ProjectCreateDialogComponent} from "../project-create-dialog/project-create-dialog.component";
import {takeUntil} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {CreateProject} from "../../../../core/api-types/project";
import {ProjectService} from "../../project.service";
import { AuthService } from '../../../../core/auth/services/auth.service';
import {ProfileService} from "../../../profile/services/profile.service";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
  selector: 'project-create-button',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButton,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './project-create-button.component.html',
  styleUrl: './project-create-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class ProjectCreateButtonComponent {
  public dialog = inject(MatDialog)
  private readonly destroyRef = inject(DestroyRef)
  private readonly projectService = inject(ProjectService)

  private readonly authService = inject(ProfileService)

  public role = this.authService.currentUserRole.asObservable()

  openAddProjectDialog() {
    const dialogRef: MatDialogRef<ProjectCreateDialogComponent> = this.dialog.open(ProjectCreateDialogComponent)
    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
      (data: CreateProject) => {
        this.projectService.addProject(data)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe()
      }
    )
  }
}
