import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule, MatDialogRef,
} from "@angular/material/dialog";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {CreateProject} from "../../../../core/api-types/project";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";

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
  ],
  templateUrl: './project-create-dialog.component.html',
  styleUrl: './project-create-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCreateDialogComponent {
  public dialogRef = inject(MatDialogRef<ProjectCreateDialogComponent>);
  private readonly data = inject<CreateProject>(MAT_DIALOG_DATA)

  public formGroup = new FormBuilder().group({
    name: new FormControl('', [Validators.required]), //adikbarakov123@gmail.com
    description: new FormControl('', [Validators.required]),
    number_of_chapters: new FormControl('', [Validators.required])
  })

  onCloseDialog() {
    this.dialogRef.close()
  }

  onSubmit() {
    if(this.formGroup.valid) {
      const data: CreateProject = {
        name: this.formGroup.value.name as string,
        description: this.formGroup.value.description as string,
        number_of_chapters: Number(this.formGroup.value.number_of_chapters)
      }
      this.dialogRef.close(data)
    }
  }
}
