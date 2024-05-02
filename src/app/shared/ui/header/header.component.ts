import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
} from '@angular/core'
import {MatIcon} from '@angular/material/icon'
import {MatToolbar} from '@angular/material/toolbar'
import {Router, RouterLink} from '@angular/router'
import {MatButton, MatIconButton} from '@angular/material/button'
import {MatDrawer, MatSidenav} from '@angular/material/sidenav'
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu'
import {LocalStorageJwtService} from '../../../core/auth/services/local-storage-jwt.service'
import {AsyncPipe, DatePipe, NgIf} from '@angular/common'
import {map, Observable, timer} from 'rxjs'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout'
import {NotificationService} from '../../../pages/notification/services/notification.service'
import {MatBadge} from '@angular/material/badge'
import {select, Store} from '@ngrx/store'
import {globalActions} from '../../../core/+state/global.actions'
import {selectNotificationsCount} from '../../../core/+state/global.selectors'

@Component({
  selector: 'header',
  standalone: true,
  imports: [
    MatIcon,
    MatToolbar,
    RouterLink,
    MatButton,
    MatIconButton,
    MatMenuTrigger,
    MatMenu,
    MatMenuItem,
    DatePipe,
    AsyncPipe,
    NgIf,
    MatBadge,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  @Input() start!: MatDrawer

  public isSmallScreen!: boolean

  public date = new Date()
  private readonly destroyRef = inject(DestroyRef)
  private readonly breakpointObserver = inject(BreakpointObserver)
  private readonly notificationService = inject(NotificationService)
  private readonly store = inject(Store)
  public readonly notificationsCount = this.store.pipe(
    select(selectNotificationsCount),
  )

  public currentTime$!: Observable<string>

  ngOnInit() {
    this.currentTime$ = timer(0, 1000).pipe(
      takeUntilDestroyed(this.destroyRef),
      map(() => {
        const date = new Date()
        return date.toString() // Можно применить любой желаемый формат времени
      }),
    )

    this.breakpointObserver
      .observe([
        Breakpoints.HandsetLandscape,
        Breakpoints.Tablet,
        Breakpoints.XSmall,
      ])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        this.isSmallScreen = result.matches
      })

    this.store.dispatch(globalActions.getNotificationCount())
  }

  private readonly localStorageJwtService = inject(LocalStorageJwtService)
  private readonly router = inject(Router)

  onLogout() {
    this.localStorageJwtService.removeItem()
    this.router.navigate(['/login'])
  }
}
