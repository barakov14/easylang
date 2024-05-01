import {inject, Injectable} from '@angular/core'
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  switchMap,
  timer,
} from 'rxjs'
import {
  Notifications,
  NotificationsCount,
} from '../../../core/api-types/notifications'
import {ApiService} from '../../../core/http/api.service'
import {tap} from 'rxjs/operators'

@Injectable()
export class NotificationService {
  private readonly apiService = inject(ApiService)

  public notifications = new BehaviorSubject<
    Notifications[] | null | undefined
  >(null)

  public notificationsCount = new BehaviorSubject<number>(0)
  getNotifications(): Observable<void> {
    return timer(0, 15000).pipe(
      switchMap(() => this.apiService.get<Notifications[]>('/notifications')),
      map((res) => {
        this.notifications.next(res)
      }),
      catchError(() => of(console.log('Notifications error occured'))),
    )
  }

  deleteNotification(id: number): Observable<void> {
    return this.apiService.delete<void>(`/notifications/${id}`).pipe(
      map(() => {
        const notifications = this.notifications.value?.filter(
          (v) => v.id !== id,
        )
        this.notifications.next(notifications)
      }),
    )
  }

  getNotificationsCount() {
    return timer(0, 15000).pipe(
      switchMap(() =>
        this.apiService.get<NotificationsCount>('/notifications/count'),
      ),
      map((res) => this.notificationsCount.next(res.count)),
      catchError((error) => {
        console.error('Error retrieving notification count:', error)
        return of(null)
      }),
    )
  }

  deleteNotificationsCount(): Observable<void> {
    return this.apiService.delete<void>(`/notifications/clear`).pipe(
      tap(() => this.notificationsCount.next(0)),
      catchError(() => of(console.log('error count notification'))),
    )
  }
}
