import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core'
import {MatFabButton} from '@angular/material/button'
import {MatIcon} from '@angular/material/icon'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {ProjectCreateDialogComponent} from '../../../project/project-create/project-create-dialog/project-create-dialog.component'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {CreateProject} from '../../../../core/api-types/project'
import {UsersCreateDialogComponent} from '../users-create-dialog/users-create-dialog.component'
import {RegisterRequest} from '../../../../core/api-types/auth'
import {UsersService} from '../../users.service'

@Component({
  selector: 'users-create-button',
  standalone: true,
  imports: [MatFabButton, MatIcon],
  templateUrl: './users-create-button.component.html',
  styleUrl: './users-create-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersCreateButtonComponent {
  private readonly dialog = inject(MatDialog)
  private readonly destroyRef = inject(DestroyRef)
  private readonly usersService = inject(UsersService)
  openAddUsersDialog() {
    const dialogRef: MatDialogRef<UsersCreateDialogComponent> =
      this.dialog.open(UsersCreateDialogComponent)
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data: RegisterRequest) => {
        this.usersService
          .createUser(data)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe()
      })
  }
}
