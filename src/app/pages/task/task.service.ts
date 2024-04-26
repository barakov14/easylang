import {inject, Injectable} from '@angular/core'
import {BehaviorSubject, catchError, map, Observable, of} from 'rxjs'
import {CreateTask, Task} from '../../core/api-types/task'
import {ApiService} from '../../core/http/api.service'
import {Project} from '../../core/api-types/project'
import {Submission} from '../../core/api-types/submissions'
import {User} from '../../core/api-types/user'
import {tap} from 'rxjs/operators'

@Injectable()
export class TaskService {
  private readonly apiService = inject(ApiService)

  public projectInfo$ = new BehaviorSubject<Project | null | undefined>(null)
  public tasksList$ = new BehaviorSubject<Task[] | null | undefined>(null)
  public taskDetail$ = new BehaviorSubject<Task | null | undefined>(null)
  public submissions$ = new BehaviorSubject<Submission[] | null | undefined>(
    null,
  )
  public editors$ = new BehaviorSubject<User[] | null | undefined>(null)
  public translators$ = new BehaviorSubject<User[] | null | undefined>(null)

  getTasksList(projectId: number): Observable<void> {
    return this.apiService.get<Task[]>(`/task/${projectId}`).pipe(
      map((res) => {
        this.tasksList$.next(res)
      }),
      catchError(() => of(console.log('error'))),
    )
  }

  addTask(data: CreateTask, projectId: number): Observable<void> {
    return this.apiService
      .post<Task, CreateTask>(`/task/${projectId}`, data)
      .pipe(
        map((res) => {
          const currentTasks: Task[] = this.tasksList$.value as Task[]
          const updatedTasks: Task[] = [...currentTasks, res]
          this.tasksList$.next(updatedTasks)
        }),
        catchError(() => of(console.log('error'))),
      )
  }

  getProjectInfo(projectId: number): Observable<void> {
    return this.apiService.get<Project>(`/projects/${projectId}`).pipe(
      map((res) => {
        this.projectInfo$.next(res)
      }),
      catchError(() => of(console.log('error project info'))),
    )
  }

  setProjectEditor(
    projectId: number,
    editorId: number,
    editor: User,
  ): Observable<void> {
    return this.apiService
      .post<void, void>(`/projects/${projectId}/editors/${editorId}`)
      .pipe(
        tap(() => {
          const project = this.projectInfo$.value
          project?.editors.push(editor)
          this.projectInfo$.next(project)
        }),
        catchError(() => of(console.log('set editor error'))),
      )
  }

  getTaskDetail(projectId: number, taskId: number): Observable<void> {
    return this.apiService.get<Task>(`/task/${projectId}/${taskId}`).pipe(
      map((res) => {
        this.taskDetail$.next(res)
      }),
      catchError(() => of(console.log('error task detail'))),
    )
  }

  getTaskSubmissions(projectId: number, taskId: number): Observable<void> {
    return this.apiService
      .get<Submission[]>(`/task/${projectId}/${taskId}/submissions`)
      .pipe(
        map((res) => {
          this.submissions$.next(res)
        }),
        catchError(() => of(console.log('error submissions'))),
      )
  }

  getEditorsList(): Observable<void> {
    return this.apiService.get<User[]>(`/users/editors`).pipe(
      map((res) => {
        this.editors$.next(res)
      }),
      catchError(() => of(console.log('error editors'))),
    )
  }

  getAvailableTranslators(): Observable<void> {
    return this.apiService.get<User[]>(`/users/translators/available`).pipe(
      map((res) => {
        this.translators$.next(res)
      }),
      catchError(() => of(console.log('error translators available'))),
    )
  }

  getAvailableEditors(): Observable<void> {
    return this.apiService.get<User[]>(`/users/editors/available`).pipe(
      map((res) => {
        this.editors$.next(res)
      }),
      catchError(() => of(console.log('error editors available'))),
    )
  }

  setTranslatorToTask(
    projectId: number,
    taskId: number,
    translatorId: number,
    translator: User,
  ): Observable<void> {
    return this.apiService
      .post<
        void,
        void
      >(`/task/${projectId}/${taskId}/translators/${translatorId}`)
      .pipe(
        tap(() => {
          const updatedTaskDetail = this.taskDetail$.value
          updatedTaskDetail?.responsibles.push(translator)
          this.taskDetail$.next(updatedTaskDetail)
        }),
      )
  }

  saveText(projectId: number, taskId: number, text: string) {
    localStorage.setItem(`submission${projectId}${taskId}`, text)
  }

  getText(projectId: number, taskId: number) {
    return localStorage.getItem(`submission${projectId}${taskId}`)
  }
}
