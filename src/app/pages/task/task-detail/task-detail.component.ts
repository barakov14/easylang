import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core'
import {ActivatedRoute, RouterLink} from '@angular/router'
import {TaskService} from '../task.service'
import {takeUntilDestroyed} from '@angular/core/rxjs-interop'
import {AsyncPipe, DatePipe, NgForOf, NgIf} from '@angular/common'
import {ProjectEditorsAddComponent} from '../../project/project-editors-add/project-editors-add.component'
import {MatButton, MatFabButton} from '@angular/material/button'
import {TaskResponsibleButtonComponent} from '../task-responsible/task-responsible-button/task-responsible-button.component'
import {MatIcon} from '@angular/material/icon'

@Component({
  selector: 'task-detail',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    AsyncPipe,
    NgForOf,
    ProjectEditorsAddComponent,
    DatePipe,
    MatButton,
    TaskResponsibleButtonComponent,
    MatFabButton,
    MatIcon,
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TaskService],
})
export class TaskDetailComponent implements OnInit {
  private readonly taskService = inject(TaskService)
  private readonly destroyRef = inject(DestroyRef)
  private readonly route = inject(ActivatedRoute)
  public taskDetail$ = this.taskService.taskDetail$.asObservable()
  public submissions$ = this.taskService.submissions$.asObservable()
  public editors$ = this.taskService.editors$.asObservable()
  public projectId!: number
  public taskId!: number

  constructor() {
    this.projectId = this.route.snapshot.params['id']
    this.taskId = this.route.snapshot.params['taskId']
  }
  ngOnInit() {
    this.taskService
      .getTaskDetail(this.projectId, this.taskId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
    this.taskService
      .getTaskSubmissions(this.projectId, this.taskId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
    this.taskService
      .getEditorsList()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe()
  }
}
