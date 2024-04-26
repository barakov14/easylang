import {ChangeDetectionStrategy, Component, inject} from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {MatButton} from '@angular/material/button'
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog'
import {MatFormField, MatLabel} from '@angular/material/form-field'
import {MatInput} from '@angular/material/input'
import {CreateProject} from '../../../../core/api-types/project'
import {MatOption, MatSelect} from '@angular/material/select'
import {RegisterRequest} from '../../../../core/api-types/auth'

@Component({
  selector: 'users-create-dialog',
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
    MatSelect,
    MatOption,
  ],
  templateUrl: './users-create-dialog.component.html',
  styleUrl: './users-create-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersCreateDialogComponent {
  public dialogRef = inject(MatDialogRef<UsersCreateDialogComponent>)
  private readonly data = inject<CreateProject>(MAT_DIALOG_DATA)

  public formGroup = new FormBuilder().group({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    role: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
  })

  onCloseDialog() {
    this.dialogRef.close()
  }

  onSubmit() {
    if (this.formGroup.valid) {
      const data: RegisterRequest = {
        name: this.formGroup.value.name as string,
        surname: this.formGroup.value.surname as string,
        username: this.formGroup.value.username as string,
        password: this.formGroup.value.password as string,
        role: this.formGroup.value.role as string,
        email: this.formGroup.value.email as string,
      }
      this.dialogRef.close(data)
    }
  }
}
