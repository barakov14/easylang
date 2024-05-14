import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpRequest,
} from '@angular/common/http'
import {catchError, Observable} from 'rxjs'
import {inject} from '@angular/core'
import {LocalStorageJwtService} from './local-storage-jwt.service'
import {Router} from '@angular/router'
import {AuthService} from './auth.service'
import {throwError} from 'rxjs/internal/observable/throwError'
import {tap} from 'rxjs/operators'

export const tokenInterceptor = (
  request: HttpRequest<any>,
  next: HttpHandlerFn,
): Observable<HttpEvent<any>> => {
  const localStorageJwtService = inject(LocalStorageJwtService)
  const token: string | null = localStorageJwtService.getToken()
  const router = inject(Router)

  if (token) {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Перенаправляем на страницу входа
        router.navigateByUrl('/login')
        // Удаляем токен из локального хранилища
        localStorageJwtService.removeItem()
        // Прерываем цепочку обработки ошибок
        return throwError(error)
      }
      if(error.status === 404) {
        router.navigateByUrl('/not-found')
      }
      // Продолжаем цепочку обработки ошибок
      return throwError(error)
    }),
  )
}
