import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core'
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
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import {CreateTask} from '../../../../core/api-types/task'
import {
  MatAutocomplete,
  MatAutocompleteTrigger,
  MatOption,
} from '@angular/material/autocomplete'
import {TaskService} from '../../task.service'
import {AsyncPipe} from '@angular/common'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {User} from '../../../../core/api-types/user'

@Component({
  selector: 'task-responsible-dialog',
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
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatOption,
    AsyncPipe,
  ],
  templateUrl: './task-responsible-dialog.component.html',
  styleUrl: './task-responsible-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TaskService],
})
export class TaskResponsibleDialogComponent implements OnInit {
  public dialogRef = inject(MatDialogRef<TaskResponsibleDialogComponent>)

  private readonly taskService = inject(TaskService)
  private readonly destroyRef = inject(DestroyRef)
  public readonly translators$ = this.taskService.translators$.asObservable()

  public formGroup = new FormBuilder().group({
    translator: new FormControl('', [Validators.required]),
  })

  displayFn(translator: User): string {
    return translator && translator.name
      ? `${translator.name} ${translator.surname}`
      : ''
  }

  ngOnInit() {
    this.taskService
      .getAvailableTranslators()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }

  onCloseDialog() {
    this.dialogRef.close()
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.dialogRef.close(this.formGroup.value.translator)
    }
  }
}
