import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core'
import {AsyncPipe, NgClass, NgForOf, NgIf} from '@angular/common'
import {ProfileService} from './services/profile.service'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'

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
  private readonly destroyRef = inject(DestroyRef)

  public user$ = this.profileService.user

  ngOnInit() {
    this.profileService
      .getUserInformation()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }
}
