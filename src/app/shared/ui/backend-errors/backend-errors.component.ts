import {ChangeDetectionStrategy, Component, Input} from '@angular/core'
import {MatIconButton} from '@angular/material/button'
import {MatIcon} from '@angular/material/icon'
import {NgClass} from '@angular/common'

@Component({
  selector: 'backend-errors',
  standalone: true,
  imports: [MatIconButton, MatIcon, NgClass],
  templateUrl: './backend-errors.component.html',
  styleUrl: './backend-errors.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackendErrorsComponent {
  visible = true

  @Input({required: true}) error!: string

  onClose() {
    this.error = ''
  }
}
