import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core'
import {NotificationService} from './services/notification.service'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {AsyncPipe, NgForOf, NgIf} from '@angular/common'

@Component({
  selector: 'notification',
  standalone: true,
  imports: [AsyncPipe, NgForOf, NgIf],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NotificationService],
})
export class NotificationComponent implements OnInit {
  private readonly notificationService = inject(NotificationService)
  private readonly destroyRef = inject(DestroyRef)

  public notifications$ = this.notificationService.notifications.asObservable()

  ngOnInit() {
    this.notificationService
      .getNotifications()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }
}
