import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatFormField, MatFormFieldModule, MatHint, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {FormBuilder, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {CreateTask} from "../../../../core/api-types/task";
import {MatDatepicker, MatDatepickerInput, MatDatepickerModule, MatDatepickerToggle} from "@angular/material/datepicker";
import { provideNativeDateAdapter } from '@angular/material/core';

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
    MatInputModule
  ],
  templateUrl: './tasks-create-dialog.component.html',
  styleUrl: './tasks-create-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNativeDateAdapter()]
})
export class TasksCreateDialogComponent {
  public dialogRef = inject(MatDialogRef<TasksCreateDialogComponent>);

  public minDate = new Date()

  public formGroup = new FormBuilder().group({
    name: new FormControl('', [Validators.required]), //adikbarakov123@gmail.com
    description: new FormControl('', [Validators.required]),
    deadline: new FormControl('', [Validators.required])
  })

  onCloseDialog() {
    this.dialogRef.close()
  }

  onSubmit() {
    if(this.formGroup.valid) {
      const data: CreateTask = {
        name: this.formGroup.value.name as string,
        description: this.formGroup.value.description as string,
        deadline: new Date(this.formGroup.value.deadline as string)
      }
      this.dialogRef.close(data)
    }
  }
}
