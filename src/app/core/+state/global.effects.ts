import {inject, Injectable} from '@angular/core'
import {ProjectService} from '../../pages/project/project.service'
import {TaskService} from '../../pages/task/task.service'
import {MatSnackBar} from '@angular/material/snack-bar'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {map, switchMap} from 'rxjs'
import {initialState} from './global.state'
import {globalActions} from './global.actions'
import {NotificationService} from '../../pages/notification/services/notification.service'

@Injectable({providedIn: 'root'})
export class GlobalEffects {
  private readonly projectService = inject(ProjectService)
  private readonly notificationService = inject(NotificationService)
  private readonly taskService = inject(TaskService)
  private readonly _snackBar = inject(MatSnackBar)
  private readonly actions$ = inject(Actions)

  loadProjectsListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(globalActions.loadProjectsList),
      switchMap(() =>
        this.projectService.getProjectsList().pipe(
          map((projectList) =>
            globalActions.loadProjectsListSuccess({
              projectsList: projectList,
            }),
          ),
        ),
      ),
    ),
  )

  getNotificationCountEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(globalActions.getNotificationCount),
      switchMap(() =>
        this.notificationService.getNotificationsCount().pipe(
          map((res) =>
            globalActions.getNotificationCountSuccess({
              notificationsCount: res.count,
            }),
          ),
        ),
      ),
    ),
  )

  getLastProjectsListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(globalActions.getLastProjectsList),
      switchMap(() =>
        this.projectService.getLastProjects().pipe(
          map((projectList) =>
            globalActions.getLastProjectsListSuccess({
              projectsList: projectList,
            }),
          ),
        ),
      ),
    ),
  )

  addProjectEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(globalActions.addProject),
      switchMap(({data}) =>
        this.projectService.addProject(data).pipe(
          map((project) =>
            globalActions.addProjectSuccess({
              project,
            }),
          ),
        ),
      ),
    ),
  )

  deleteProjectEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(globalActions.deleteProject),
      switchMap(({projectId}) =>
        this.projectService.deleteProject(projectId).pipe(
          map((project) =>
            globalActions.deleteProjectSuccess({
              projectId,
            }),
          ),
        ),
      ),
    ),
  )

  setProjectEditorEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(globalActions.setProjectEditor),
      switchMap(({projectId, editor}) =>
        this.taskService.setProjectEditor(projectId, editor.id).pipe(
          map((editor) =>
            globalActions.setProjectEditorSuccess({
              editor,
            }),
          ),
        ),
      ),
    ),
  )

  loadTasksListEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(globalActions.loadTasksList),
      switchMap(({projectId}) =>
        this.taskService.getTasksList(projectId).pipe(
          map((tasksList) =>
            globalActions.loadTasksListSuccess({
              tasksList,
            }),
          ),
        ),
      ),
    ),
  )

  addTaskEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(globalActions.addTask),
      switchMap(({data, projectId}) =>
        this.taskService.addTask(data, projectId).pipe(
          map((task) =>
            globalActions.addTaskSuccess({
              task,
            }),
          ),
        ),
      ),
    ),
  )
}
