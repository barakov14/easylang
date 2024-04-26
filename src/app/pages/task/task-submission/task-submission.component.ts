import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms'
import {
  EditorConfig,
  NgxSimpleTextEditorModule,
  ST_BUTTONS,
} from 'ngx-simple-text-editor'
import {ProfileService} from '../../profile/services/profile.service'
import {MatFabButton} from '@angular/material/button'
import {MatIcon} from '@angular/material/icon'
import {AsyncPipe, NgIf} from '@angular/common'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {debounceTime} from 'rxjs'
import {TaskService} from '../task.service'
import {ActivatedRoute} from '@angular/router'

@Component({
  selector: 'task-submission',
  standalone: true,
  imports: [
    NgxSimpleTextEditorModule,
    FormsModule,
    ReactiveFormsModule,
    MatFabButton,
    MatIcon,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './task-submission.component.html',
  styleUrl: './task-submission.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TaskService],
})
export class TaskSubmissionComponent {
  private readonly profileService = inject(ProfileService)
  private readonly taskService = inject(TaskService)

  public readonly user$ = this.profileService.user.asObservable()
  private readonly destroyRef = inject(DestroyRef)
  private readonly route = inject(ActivatedRoute)
  private projectId = this.route.snapshot.params['id']
  private taskId = this.route.snapshot.params['taskId']

  public formGroup!: FormGroup

  config: EditorConfig = {
    placeholder: 'Type something...',
    buttons: ST_BUTTONS,
  }

  constructor() {
    this.formGroup = new FormBuilder().group({
      text: new FormControl(''),
    })
    const savedText = this.taskService.getText(this.projectId, this.taskId)
    if (savedText) {
      this.formGroup.get('text')!.setValue(savedText)
    }
    this.formGroup.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef), debounceTime(1000))
      .subscribe((v) => {
        this.taskService.saveText(this.projectId, this.taskId, v.text)
      })
  }
}
