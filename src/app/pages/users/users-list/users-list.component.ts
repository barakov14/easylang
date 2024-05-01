import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core'
import {AsyncPipe, NgForOf, NgIf} from '@angular/common'
import {UsersCreateButtonComponent} from '../users-create/users-create-button/users-create-button.component'
import {TasksCreateButtonComponent} from '../../task/tasks-create/tasks-create-button/tasks-create-button.component'
import {UsersService} from '../users.service'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {MatButton, MatIconButton} from '@angular/material/button'
import {MatIcon} from '@angular/material/icon'
import {MatFormField, MatInput, MatLabel} from '@angular/material/input'
import {Router} from '@angular/router'

@Component({
  selector: 'users-list',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    NgIf,
    UsersCreateButtonComponent,
    TasksCreateButtonComponent,
    MatIconButton,
    MatIcon,
    MatInput,
    MatFormField,
    MatLabel,
    MatButton,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsersService],
})
export class UsersListComponent implements OnInit {
  private readonly usersService = inject(UsersService)
  private readonly destroyRef = inject(DestroyRef)
  private readonly router = inject(Router)
  public readonly users$ = this.usersService.users$.asObservable()
  ngOnInit() {
    this.usersService
      .getUsers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }

  onDeleteUser(id: number) {
    this.usersService
      .deleteUser(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }

  changeIsAvailable(id: number, isReady: boolean) {
    this.usersService
      .changeUserIsAvailable(id, isReady)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        () => {}, // Empty callback for success
        (error) => {
          // Handle error
          console.error('Error changing user availability:', error)
          // You can also show an error message to the user if needed
        },
      )
  }

  onLogout() {
    localStorage.removeItem('jwtToken')
    this.router.navigate(['/login'])
  }
}
