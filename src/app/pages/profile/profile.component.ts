import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {

}
