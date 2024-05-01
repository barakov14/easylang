import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {MatButtonModule} from '@angular/material/button'
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog'
import {MatFormField, MatHint, MatLabel} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatIcon} from '@angular/material/icon'
import {DateValidator} from '../../../core/utils/date.validator'
import {NgIf} from '@angular/common'

@Component({
  selector: 'task-deadline-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatDatepickerModule,
    MatHint,
    MatNativeDateModule,
    MatButtonModule,
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatIcon,
    NgIf,
  ],
  templateUrl: './task-deadline-dialog.component.html',
  styleUrl: './task-deadline-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})
export class TaskDeadlineDialogComponent {
  private readonly dialogRef = inject(MatDialogRef)

  public validationErrors = ''

  public minDate = new Date()

  public formGroup = new FormBuilder().group({
    deadline: new FormControl('', [Validators.required, DateValidator]),
  })

  onCloseDialog() {
    this.dialogRef.close()
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value.deadline)
    } else {
      this.validationErrors = 'Please fill out date correctly.'
    }
  }
}
