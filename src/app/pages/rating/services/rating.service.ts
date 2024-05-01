import {inject, Injectable} from '@angular/core'
import {BehaviorSubject, catchError, map, Observable, of} from 'rxjs'
import {UserDetail} from '../../../core/api-types/user'
import {ApiService} from '../../../core/http/api.service'

@Injectable()
export class RatingService {
  private readonly apiService = inject(ApiService)

  public rating = new BehaviorSubject<UserDetail[] | null | undefined>(null)

  getRating(): Observable<void> {
    return this.apiService.get<UserDetail[]>('/users/translators/rating').pipe(
      map((res) => {
        this.rating.next(res)
      }),
      catchError(() => of(console.log('error rating'))),
    )
  }
}
