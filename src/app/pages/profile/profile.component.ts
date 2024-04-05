import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {NotificationService} from "./services/notification.service";
import {DestroyService} from "../../core/utils/destroy.service";
import {takeUntil} from "rxjs";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {ProfileService} from "./services/profile.service";

@Component({
  selector: 'profile',
  standalone: true,
  imports: [
    NgForOf,
    AsyncPipe,
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    NotificationService,
    ProfileService
  ]
})
export class ProfileComponent implements OnInit {
  private readonly notificationService = inject(NotificationService)
  private readonly profileService = inject(ProfileService)
  private readonly destroy$ = inject(DestroyService)

  public notifications$ = this.notificationService.notifications.asObservable()
  public user$ = this.profileService.user.asObservable()


  ngOnInit() {
    this.notificationService.getNotifications().pipe(
      takeUntil(this.destroy$)
    ).subscribe()
  }
}
