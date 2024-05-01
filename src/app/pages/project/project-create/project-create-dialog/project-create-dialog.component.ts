import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog'
import {MatFormField, MatLabel} from '@angular/material/form-field'
import {MatInput} from '@angular/material/input'
import {MatButton, MatIconButton} from '@angular/material/button'
import {CreateProject} from '../../../../core/api-types/project'
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {MatIcon} from '@angular/material/icon'
import {NgIf} from '@angular/common'

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
  ],
  templateUrl: './project-create-dialog.component.html',
  styleUrl: './project-create-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCreateDialogComponent {
  public dialogRef = inject(MatDialogRef<ProjectCreateDialogComponent>)
  private readonly data = inject<CreateProject>(MAT_DIALOG_DATA)

  validationErrors = ''

  public formGroup = new FormBuilder().group({
    name: new FormControl('', [Validators.required]), //adikbarakov123@gmail.com
    description: new FormControl('', [Validators.required]),
    number_of_pages: new FormControl('', [Validators.required]),
  })

  onSubmit() {
    this.validationErrors = ''
    if (this.formGroup.valid) {
      const data: CreateProject = {
        name: this.formGroup.value.name as string,
        description: this.formGroup.value.description as string,
        number_of_pages: Number(this.formGroup.value.number_of_pages),
      }
      this.dialogRef.close(data)
    } else {
      this.validationErrors = 'Please fill out all required fields correctly.'
    }
  }
}
