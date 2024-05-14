import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core'
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog'
import {MatFormField, MatHint, MatLabel, MatSuffix} from '@angular/material/form-field'
import {MatInput} from '@angular/material/input'
import {MatButton, MatIconButton} from '@angular/material/button'
import {CreateProject} from '../../../../core/api-types/project'
import {
  FormBuilder,
  FormControl, FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import {MatIcon} from '@angular/material/icon'
import {NgIf} from '@angular/common'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {ProjectService} from '../../project.service'
import {DateValidator} from '../../../../core/utils/date.validator'
import {MatDatepicker, MatDatepickerInput, MatDatepickerModule, MatDatepickerToggle} from '@angular/material/datepicker'
import {MatNativeDateModule, provideNativeDateAdapter} from '@angular/material/core'

@Component({
  selector: 'project-create-dialog',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatDialogModule,
    MatButton,
    ReactiveFormsModule,
    MatIconButton,
    MatIcon,
    NgIf,
    MatDatepickerModule,
    MatNativeDateModule,
    MatHint,
    MatSuffix,
  ],
  templateUrl: './project-create-dialog.component.html',
  styleUrl: './project-create-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()],
})
export class ProjectCreateDialogComponent {
  public dialogRef = inject(MatDialogRef<ProjectCreateDialogComponent>)
  validationErrors = ''

  public minDate = new Date()


  public formGroup = new FormBuilder().group({
    projectName: new FormControl('', [Validators.required]), //adikbarakov123@gmail.com
    description: new FormControl('', [Validators.required]),
    numberOfPages: new FormControl('', [Validators.required, Validators.min(1)]),
    deadline: new FormControl('',[DateValidator, Validators.required])
  })

  onSubmit() {
    this.validationErrors = ''
    if (this.formGroup.valid) {
      const data: CreateProject = {
        name: this.formGroup.value.projectName as string,
        description: this.formGroup.value.description as string,
        number_of_pages: Number(this.formGroup.value.numberOfPages),
        deadline: this.formGroup.value.deadline as string
      }
      this.dialogRef.close(data)
    } else {
      this.validationErrors = 'Please fill out all required fields correctly.'
    }
  }
}
