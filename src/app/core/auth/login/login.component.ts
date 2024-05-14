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
import {LoginRequest} from '../../api-types/auth'
import {catchError, of, takeUntil} from 'rxjs'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {MatStepperModule} from '@angular/material/stepper'
import {AsyncPipe, NgIf} from '@angular/common'
import {BackendErrorsComponent} from '../../../shared/ui/backend-errors/backend-errors.component'
import {tap} from 'rxjs/operators'

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
    NgIf,
    AsyncPipe,
    BackendErrorsComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly authService = inject(AuthService)
  private readonly destroy$ = inject(DestroyRef)

  public error$ = this.authService.errors$

  validationErrors = ''

  isSubmitting: boolean = false

  public formGroup = new FormBuilder().group({
    username: new FormControl('', [Validators.required]), //adikbarakov123@gmail.com
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  })

  onLogin() {
    this.isSubmitting = true
    if (this.formGroup.valid) {
      const data: LoginRequest = {
        username: this.formGroup.value.username as string,
        password: this.formGroup.value.password as string,
      }

      this.validationErrors = ''

      this.error$.next(null)

      this.authService
        .login(data)
        .pipe(
          takeUntilDestroyed(this.destroy$),
          tap(() => this.isSubmitting = false),
          catchError(() => {
            this.isSubmitting = false
            return of()
          })
        )
        .subscribe()
    } else {
      this.validationErrors = 'Invalid username or password.'
      this.isSubmitting = false
    }
  }
}
