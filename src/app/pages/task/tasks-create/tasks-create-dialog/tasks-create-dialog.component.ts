import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import {MatButton, MatIconButton} from '@angular/material/button'
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {CreateTask} from '../../../../core/api-types/task'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {provideNativeDateAdapter} from '@angular/material/core'
import {MatIcon} from '@angular/material/icon'
import {BackendErrorsComponent} from '../../../../shared/ui/backend-errors/backend-errors.component'
import {NgIf} from '@angular/common'

@Component({
  selector: 'tasks-create-dialog',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatIcon,
    MatIconButton,
    BackendErrorsComponent,
    NgIf,
  ],
  templateUrl: './tasks-create-dialog.component.html',
  styleUrl: './tasks-create-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})
export class TasksCreateDialogComponent {
  public dialogRef = inject(MatDialogRef<TasksCreateDialogComponent>)

  public minDate = new Date()

  public formGroup = new FormBuilder().group({
    name: new FormControl('', [Validators.required]), //adikbarakov123@gmail.com
    description: new FormControl('', [Validators.required]),
    pages: new FormControl('', [Validators.required]),
  })

  public validationError = ''

  onCloseDialog() {
    this.dialogRef.close()
  }

  onSubmit() {
    this.validationError = ''
    if (this.formGroup.valid) {
      const data: CreateTask = {
        name: this.formGroup.value.name as string,
        description: this.formGroup.value.description as string,
        pages: this.formGroup.value.pages as string,
      }
      this.dialogRef.close(data)
    } else {
      this.validationError = 'Please fill out all required fields correctly.'
    }
  }
}
