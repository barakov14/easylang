import {inject, Injectable} from '@angular/core'
import {BehaviorSubject, catchError, map, Observable, of} from 'rxjs'
import {Notifications} from '../../../core/api-types/notifications'
import {ApiService} from '../../../core/http/api.service'

@Injectable()
export class NotificationService {
  private readonly apiService = inject(ApiService)

  public notifications = new BehaviorSubject<
    Notifications[] | null | undefined
  >(null)
  getNotifications(): Observable<void> {
    return this.apiService.get<Notifications[]>('/notifications').pipe(
      map((res) => {
        this.notifications.next(res)
      }),
      catchError(() => of(console.log('Notifications error occured'))),
    )
  }
}
