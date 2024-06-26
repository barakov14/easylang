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
import {CreateTask} from '../../../../core/api-types/task'
import {MatIcon} from '@angular/material/icon'
import {NgIf} from '@angular/common'

@Component({
  selector: 'pages-dialog',
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
  templateUrl: './pages-dialog.component.html',
  styleUrl: './pages-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagesDialogComponent {
  public dialogRef = inject(MatDialogRef<PagesDialogComponent>)

  public formGroup = new FormBuilder().group({
    pages: new FormControl('', [Validators.min(1)]),
  })

  public validationErrors = ''

  onCloseDialog() {
    this.dialogRef.close()
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(Number(this.formGroup.value.pages))
    } else {
      this.validationErrors = 'Please enter pages you have done.'
    }
  }
}
