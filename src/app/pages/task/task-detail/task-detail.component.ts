import {ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {TaskService} from "../task.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {takeUntil} from "rxjs";
import {ProjectEditorsAddComponent} from "../../project/project-editors-add/project-editors-add.component";

@Component({
  selector: 'task-detail',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    AsyncPipe,
    NgForOf,
    ProjectEditorsAddComponent
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TaskService]
})
export class TaskDetailComponent implements OnInit {
  private readonly taskService = inject(TaskService)
  private readonly destroyRef = inject(DestroyRef)
  private readonly route = inject(ActivatedRoute)
  public taskDetail$ = this.taskService.taskDetail$.asObservable()
  public submissions$ = this.taskService.submissions$.asObservable()
  public editors$ = this.taskService.editors$.asObservable()

  ngOnInit() {
    const projectId = this.route.snapshot.params['id']
    const taskId = this.route.snapshot.params['taskId']
    this.taskService.getTaskDetail(projectId, taskId).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe()
    this.taskService.getTaskSubmissions(projectId, taskId).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe()
    this.taskService.getEditorsList().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe()
  }
}
