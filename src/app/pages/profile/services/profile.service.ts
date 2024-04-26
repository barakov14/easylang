import {inject, Injectable} from '@angular/core'
import {BehaviorSubject, catchError, map, Observable, of, tap} from 'rxjs'
import {ApiService} from '../../../core/http/api.service'
import {User} from '../../../core/api-types/user'
import {Router} from '@angular/router'

@Injectable({providedIn: 'root'})
export class ProfileService {
  private readonly apiService = inject(ApiService)
  public user = new BehaviorSubject<User | null | undefined>(null)
  private readonly router = inject(Router)
  getUserInformation(): Observable<User> {
    return this.apiService.get<User>('/user').pipe(
      tap((res) => {
        console.log(res.role)
        if (res.role === 'admin') {
          this.router.navigateByUrl('/users')
        }
        this.user.next(res)
      }),
      catchError(() => {
        console.log('Error occurred')
        return of() // Возвращаем пустой Observable в случае ошибки
      }),
    )
  }
}
