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
import {PaginatorModule} from 'primeng/paginator'
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {MatIcon} from '@angular/material/icon'

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
    PaginatorModule,
    ReactiveFormsModule,
    MatIcon,
    MatIconButton,
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

  onCloseDialog() {
    this.dialogRef.close()
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value.comment)
    }
  }
}
