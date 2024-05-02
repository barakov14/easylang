import {inject, Injectable} from '@angular/core'
import {BehaviorSubject, catchError, map, of, tap} from 'rxjs'
import {User} from '../../core/api-types/user'
import {ApiService} from '../../core/http/api.service'
import {RegisterRequest} from '../../core/api-types/auth'
import {MatSnackBar} from '@angular/material/snack-bar'

@Injectable()
export class UsersService {
  private readonly apiService = inject(ApiService)

  public readonly users$ = new BehaviorSubject<User[] | null>(null)
  private readonly snackbar = inject(MatSnackBar)

  getUsers() {
    return this.apiService.get<User[]>('/users').pipe(
      map((res) => {
        this.users$.next(res)
      }),
      catchError(() => {
        return of(console.log('error fetching users'))
      }),
    )
  }

  createUser(data: RegisterRequest) {
    return this.apiService.post<User, RegisterRequest>('/register', data).pipe(
      map((res) => {
        const users: User[] = this.users$.value as User[]
        const updatedUsers: User[] = [...users, res]
        this.users$.next(updatedUsers)
        this.snackbar.open('User created successfully', 'OK')
      }),
    )
  }
  deleteUser(id: number) {
    return this.apiService.delete<void>(`/user/${id}`).pipe(
      map(() => {
        const users: User[] = this.users$.value as User[]
        const updatedUsers = users.filter((user) => user.id !== id)
        this.users$.next(updatedUsers)
      }),
    )
  }

  changeUserIsAvailable(id: number, isReady: boolean) {
    return this.apiService
      .post<void, void>(`/users/${id}/` + (isReady ? 'not_ready' : 'ready')) // Enclose the expression in parentheses
      .pipe(
        tap(() => {
          const users: User[] = this.users$.value as User[]
          const updatedUsers: User[] = users.map((user) => {
            if (user.id === id) {
              user.status = isReady ? 'NOT READY' : 'READY'
            }
            return user
          })
          this.users$.next(updatedUsers)
        }),
      )
  }
}
