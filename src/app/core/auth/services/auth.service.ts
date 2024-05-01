import {inject, Injectable} from '@angular/core'
import {LocalStorageJwtService} from './local-storage-jwt.service'
import {
  AuthResponse,
  GetRefreshToken,
  InvitationCodeRequest,
  InvitationCodeResponse,
  LoginRequest,
  RegisterRequest,
} from '../../api-types/auth'
import {ApiService} from '../../http/api.service'
import {BehaviorSubject, catchError, map, Observable, of} from 'rxjs'
import {Router} from '@angular/router'
import {ErrorResponse} from '../../api-types/error'
import {MatSnackBar} from '@angular/material/snack-bar'

@Injectable({providedIn: 'root'})
export class AuthService {
  private readonly localStorageJwtService = inject(LocalStorageJwtService)
  private readonly apiService = inject(ApiService)
  private readonly router = inject(Router)
  private readonly _snackbar = inject(MatSnackBar)

  public errors$ = new BehaviorSubject<ErrorResponse | null>(null)

  public login(data: LoginRequest): Observable<void> {
    return this.apiService
      .post<AuthResponse, LoginRequest>('/login', data)
      .pipe(
        map((res: AuthResponse) => {
          this.router.navigateByUrl('/dashboard')
          this.localStorageJwtService.setItem(res.token)
          this._snackbar.open('Authenticated successfully', 'OK')
        }),
        catchError((errors) => {
          // Вывод ошибки в консоль для отладки
          return of(this.errors$.next(errors.error)) // Отправка ошибки через BehaviorSubject
        }),
      )
  }

  public register(data: RegisterRequest): Observable<AuthResponse | void> {
    return this.apiService
      .post<AuthResponse, LoginRequest>('/login', data)
      .pipe(
        map((res) => {
          this.router.navigateByUrl('/dashboard')
          this.localStorageJwtService.setItem(res.token)
        }),
        catchError(() => of(console.log('Backend errors here'))),
      )
  }
  public refreshToken(): Observable<GetRefreshToken | void> {
    return this.apiService.post<GetRefreshToken, void>('/refresh').pipe(
      map((res) => {
        this.localStorageJwtService.removeItem()
        this.localStorageJwtService.setItem(res.access_token)
      }),
    )
  }
}
