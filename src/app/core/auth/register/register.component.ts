import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {LoginRequest, RegisterRequest} from "../../api-types/auth";
import {takeUntil} from "rxjs";
import {DestroyService} from "../../utils/destroy.service";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext, MatStepperPrevious} from "@angular/material/stepper";

@Component({
  selector: 'register',
  standalone: true,
    imports: [
        MatCardModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInput,
        RouterLink,
        ReactiveFormsModule,
        MatStep,
        MatStepLabel,
        MatStepper,
        MatStepperNext,
        MatStepperPrevious
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  private readonly authService = inject(AuthService)
  private readonly destroy$ = inject(DestroyService)

  public formGroup = new FormBuilder().group({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]), //adikbarakov123@gmail.com
    password: new FormControl('', [Validators.required]),
    invitation_code: new FormControl('', [Validators.required]),
  })


  onRegister() {
    if(this.formGroup.valid) {
      const data: RegisterRequest = {
        name: this.formGroup.value.name as string,
        surname: this.formGroup.value.surname as string,
        username: this.formGroup.value.username as string,
        password: this.formGroup.value.password as string,
        invitation_code: this.formGroup.value.invitation_code as string
      }

      this.authService.register(data).pipe(
        takeUntil(this.destroy$)
      ).subscribe()
    }
  }
}
