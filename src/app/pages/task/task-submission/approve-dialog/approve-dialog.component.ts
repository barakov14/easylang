import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
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
import {MatIcon} from '@angular/material/icon'
import {NgIf} from '@angular/common'

@Component({
  selector: 'approve-dialog',
  standalone: true,
  imports: [
    FormsModule,
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
  templateUrl: './approve-dialog.component.html',
  styleUrl: './approve-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApproveDialogComponent {
  public dialogRef = inject(MatDialogRef<ApproveDialogComponent>)

  public formGroup = new FormBuilder().group({
    grade: new FormControl('100', [Validators.required, Validators.max(100)]),
  })

  public validationErrors = ''

  onCloseDialog() {
    this.dialogRef.close()
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(Number(this.formGroup.value.grade))
    } else {
      this.validationErrors = 'Please grade the work.'
    }
  }
}
