import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import {MatButton, MatIconButton} from '@angular/material/button'
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog'
import {MatFormField, MatLabel} from '@angular/material/form-field'
import {MatInput} from '@angular/material/input'
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {MatIcon} from '@angular/material/icon'
import {NgIf} from '@angular/common'

@Component({
  selector: 'not-approve-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatIcon,
    MatIconButton,
    NgIf
  ],
  templateUrl: './not-approve-dialog.component.html',
  styleUrl: './not-approve-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotApproveDialogComponent {
  public dialogRef = inject(MatDialogRef<NotApproveDialogComponent>)

  public formGroup = new FormBuilder().group({
    comment: new FormControl('', [Validators.required]),
  })

  public validationErrors = ''

  onCloseDialog() {
    this.dialogRef.close()
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value.comment)
    } else {
      this.validationErrors = 'Please write some comments.'
    }
  }
}
