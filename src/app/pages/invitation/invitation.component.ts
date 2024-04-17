import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatOption, MatSelect} from "@angular/material/select";
import {AuthService} from "../../core/auth/services/auth.service";
import {InvitationCodeRequest} from "../../core/api-types/auth";
import {takeUntil} from "rxjs";
import {DestroyService} from "../../core/utils/destroy.service";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'invitation',
  standalone: true,
  imports: [
    MatInput,
    MatCard,
    MatSelect,
    MatOption,
    ReactiveFormsModule,
    AsyncPipe,
    NgIf,
    MatButton,
    MatFormField,
    MatCardContent,
    MatCardTitle,
    MatCardHeader,
    MatLabel,
    MatCardFooter
  ],
  templateUrl: './invitation.component.html',
  styleUrl: './invitation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvitationComponent {
  private readonly authService = inject(AuthService)
  private readonly destroy$ = inject(DestroyService)

  public readonly invitationCode$ = this.authService.invitationCode.asObservable()

  public formGroup = new FormBuilder().group({
    role: new FormControl('', [Validators.required]),
  })

  onSubmit() {
    if(this.formGroup.valid) {
      const data: InvitationCodeRequest = {
        role: this.formGroup.value.role as string
      }
      this.authService.getInvitationCode(data).pipe(
        takeUntil(this.destroy$)
      ).subscribe()
    }
  }
}
