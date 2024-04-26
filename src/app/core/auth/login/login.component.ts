import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core'
import {MatCardModule} from '@angular/material/card'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatButtonModule} from '@angular/material/button'
import {MatInput} from '@angular/material/input'
import {RouterLink} from '@angular/router'
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {AuthService} from '../services/auth.service'
import {AuthResponse, LoginRequest} from '../../api-types/auth'
import {DestroyService} from '../../utils/destroy.service'
import {takeUntil} from 'rxjs'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {MatStepperModule} from '@angular/material/stepper'

@Component({
  selector: 'login',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInput,
    RouterLink,
    ReactiveFormsModule,
    MatStepperModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly authService = inject(AuthService)
  private readonly destroy$ = inject(DestroyRef)

  public formGroup = new FormBuilder().group({
    username: new FormControl('', [Validators.required]), //adikbarakov123@gmail.com
    password: new FormControl('', [Validators.required]),
  })

  onLogin() {
    if (this.formGroup.valid) {
      const data: LoginRequest = {
        username: this.formGroup.value.username as string,
        password: this.formGroup.value.password as string,
      }

      this.authService
        .login(data)
        .pipe(takeUntilDestroyed(this.destroy$))
        .subscribe()
    }
  }
}
