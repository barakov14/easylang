import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core'
import {DestroyService} from '../../core/utils/destroy.service'
import {takeUntil} from 'rxjs'
import {AsyncPipe, NgClass, NgForOf, NgIf} from '@angular/common'
import {ProfileService} from './services/profile.service'

@Component({
  selector: 'profile',
  standalone: true,
  imports: [NgForOf, AsyncPipe, NgIf, NgClass],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  private readonly profileService = inject(ProfileService)
  private readonly destroy$ = inject(DestroyService)

  public user$ = this.profileService.user

  ngOnInit() {
    this.profileService
      .getUserInformation()
      .pipe(takeUntil(this.destroy$))
      .subscribe()
  }
}
