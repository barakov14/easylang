import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core'
import {AsyncPipe} from '@angular/common'
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete'
import {MatButton} from '@angular/material/button'
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
import {TaskService} from '../../task.service'
import {User} from '../../../../core/api-types/user'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'

@Component({
  selector: 'task-editor-dialog',
  standalone: true,
  imports: [
    AsyncPipe,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatOption,
    PaginatorModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-editor-dialog.component.html',
  styleUrl: './task-editor-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TaskService],
})
export class TaskEditorDialogComponent implements OnInit {
  public dialogRef = inject(MatDialogRef<TaskEditorDialogComponent>)

  private readonly taskService = inject(TaskService)
  private readonly destroyRef = inject(DestroyRef)
  public readonly editors$ = this.taskService.editors$.asObservable()

  public formGroup = new FormBuilder().group({
    editor: new FormControl('', [Validators.required]),
  })

  displayFn(editor: User): string {
    return editor && editor.name ? `${editor.name} ${editor.surname}` : ''
  }

  ngOnInit() {
    this.taskService
      .getAvailableEditors()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }

  onCloseDialog() {
    this.dialogRef.close()
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value.editor)
    }
  }
}