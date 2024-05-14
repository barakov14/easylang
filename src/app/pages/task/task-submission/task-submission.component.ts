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
import {User} from '../../../core/api-types/user'
import {MatDialog, MatDialogRef} from '@angular/material/dialog'
import {PagesDialogComponent} from './pages-dialog/pages-dialog.component'
import {
  SendSubmissionToEditor,
  Submission,
  SubmissionApprove,
  SubmissionComment,
} from '../../../core/api-types/submissions'
import {NotApproveDialogComponent} from './not-approve-dialog/not-approve-dialog.component'
import {ApproveDialogComponent} from './approve-dialog/approve-dialog.component'

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
})
export class TaskSubmissionComponent implements OnInit {
  private readonly profileService = inject(ProfileService)
  private readonly taskService = inject(TaskService)

  public readonly user$ = this.profileService.user.asObservable()
  public user!: User
  public readonly submission$ = this.taskService.submission$
  private readonly destroyRef = inject(DestroyRef)
  private readonly route = inject(ActivatedRoute)
  private readonly dialog = inject(MatDialog)
  private projectId = this.route.snapshot.params['id']
  private taskId = this.route.snapshot.params['taskId']
  private submissionId = this.route.snapshot.queryParams['submissionId']

  public formGroup!: FormGroup

  config: EditorConfig = {
    placeholder: 'Type something...',
    buttons: ST_BUTTONS,
  }

  goBack(): void {
    window.history.back()
  }

  ngOnInit() {
    this.profileService
      .getUserInformation()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((user) => {
        this.user = user
        if (this.submissionId) {
          this.taskService
            .getSubmissionText(this.submissionId)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
              this.formGroup.get('text')?.setValue(this.submission$.value?.text)
            })
        }
      })
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

  openPagesDialog() {
    const dialogRef: MatDialogRef<PagesDialogComponent> = this.dialog.open(
      PagesDialogComponent,
      {
        hasBackdrop: true,
      },
    )
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((pages: number) => {
        if (pages) {
          const data: SendSubmissionToEditor = {
            pages_done: pages,
            text: this.formGroup.value.text as string,
          }
          this.taskService
            .sendSubmissionToEditor(this.projectId, this.taskId, data)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
              this.taskService.deleteText(this.projectId, this.taskId)
            })
        }
      })
  }
  openNotApproveDialog() {
    const dialogRef: MatDialogRef<NotApproveDialogComponent> = this.dialog.open(
      NotApproveDialogComponent,
      {
        hasBackdrop: true,
      },
    )
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((comment: string) => {
        if (comment) {
          const data: SubmissionComment = {
            comment,
          }
          this.taskService
            .submissionReject(
              this.projectId,
              this.taskId,
              this.submissionId,
              data,
            )
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe()
        }
      })
  }
  openApproveDialog() {
    const dialogRef: MatDialogRef<ApproveDialogComponent> = this.dialog.open(
      ApproveDialogComponent,
      {
        hasBackdrop: true,
      },
    )
    dialogRef
      .afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((grade: number) => {
        const data: SubmissionApprove = {
          grade,
        }
        console.log(data)
        this.taskService
          .submissionApprove(
            this.projectId,
            this.taskId,
            this.submissionId,
            data,
          )
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe()
      })
  }
}
