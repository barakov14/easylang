import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core'
import {RatingService} from './services/rating.service'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {AsyncPipe, NgForOf, NgIf} from '@angular/common'

@Component({
  selector: 'rating',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgForOf],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RatingService],
})
export class RatingComponent implements OnInit {
  private readonly ratingService = inject(RatingService)
  private readonly destoryRef = inject(DestroyRef)
  public rating = this.ratingService.rating.asObservable()
  ngOnInit() {
    this.ratingService
      .getRating()
      .pipe(takeUntilDestroyed(this.destoryRef))
      .subscribe()
  }
}
