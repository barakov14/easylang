import {inject, Injectable} from '@angular/core'
import {BehaviorSubject, catchError, map, Observable, of} from 'rxjs'
import {CreateTask, SetDeadline, Task} from '../../core/api-types/task'
import {ApiService} from '../../core/http/api.service'
import {Project} from '../../core/api-types/project'
import {
  SendSubmissionToEditor,
  Submission,
  SubmissionApprove,
  SubmissionComment,
} from '../../core/api-types/submissions'
import {User} from '../../core/api-types/user'
import {tap} from 'rxjs/operators'
import {Router} from '@angular/router'
import {MatSnackBar} from '@angular/material/snack-bar'
import {ErrorResponse} from '../../core/api-types/error'

@Injectable()
export class TaskService {
  private readonly apiService = inject(ApiService)
  private readonly router = inject(Router)
  private readonly snackbar = inject(MatSnackBar)

  public projectInfo$ = new BehaviorSubject<Project | null | undefined>(null)
  public tasksList$ = new BehaviorSubject<Task[] | null | undefined>(null)
  public filteredTasksList$ = new BehaviorSubject<Task[] | null | undefined>(
    null,
  )
  public taskDetail$ = new BehaviorSubject<Task | null | undefined>(null)
  public submissions$ = new BehaviorSubject<Submission[] | null | undefined>(
    null,
  )

  public errors$ = new BehaviorSubject<null | ErrorResponse>(null)

  public projectEditors$ = new BehaviorSubject<User[] | null | undefined>(null)
  public editors$ = new BehaviorSubject<User[] | null | undefined>(null)
  public translators$ = new BehaviorSubject<User[] | null | undefined>(null)
  public submission$ = new BehaviorSubject<Submission | null | undefined>(null)

  private readonly _snackBar = inject(MatSnackBar)

  getTasksList(projectId: number): Observable<void> {
    return this.apiService.get<Task[]>(`/task/${projectId}`).pipe(
      map((res) => {
        this.tasksList$.next(res)
        this.filteredTasksList$.next(res)
      }),
      catchError((errors) => of(this.errors$.next(errors.error))),
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
          this._snackBar.open('Task created successfully', 'OK')
        }),
        catchError((errors) => of(this.errors$.next(errors.error))),
      )
  }

  getProjectInfo(projectId: number): Observable<void> {
    return this.apiService.get<Project>(`/projects/${projectId}`).pipe(
      map((res) => {
        this.projectInfo$.next(res)
        this.projectEditors$.next(res.editors)
      }),
      catchError((errors) => of(this.errors$.next(errors.error))),
    )
  }

  setProjectEditor(projectId: number, editorId: number): Observable<void> {
    return this.apiService
      .post<User, void>(`/projects/${projectId}/editors/${editorId}`)
      .pipe(
        map((res) => {
          console.log(res)
          const updatedProjectEditors = this.projectEditors$.value // Создание копии объекта проекта
          updatedProjectEditors?.push(res) // Изменение копии объекта
          console.log(updatedProjectEditors)
          this._snackBar.open('Chief editor appointed successfully', 'OK')
          this.projectEditors$.next(updatedProjectEditors) // Присваивание нового объекта обратно в поток
        }),
        catchError((errors) => of(this.errors$.next(errors.error))),
      )
  }

  getTaskDetail(projectId: number, taskId: number): Observable<void> {
    return this.apiService.get<Task>(`/task/${projectId}/${taskId}`).pipe(
      map((res) => {
        this.taskDetail$.next(res)
      }),
      catchError((errors) => of(this.errors$.next(errors.error))),
    )
  }

  getTaskSubmissions(projectId: number, taskId: number): Observable<void> {
    return this.apiService
      .get<Submission[]>(`/task/${projectId}/${taskId}/submissions`)
      .pipe(
        map((res) => {
          this.submissions$.next(res)
        }),
        catchError((errors) => of(this.errors$.next(errors.error))),
      )
  }

  getEditorsList(): Observable<void> {
    return this.apiService.get<User[]>(`/users/editors`).pipe(
      map((res) => {
        this.editors$.next(res)
      }),
      catchError((errors) => of(this.errors$.next(errors.error))),
    )
  }

  getAvailableTranslators(): Observable<void> {
    return this.apiService.get<User[]>(`/users/translators/available`).pipe(
      map((res) => {
        this.translators$.next(res)
      }),
      catchError((errors) => of(this.errors$.next(errors.error))),
    )
  }

  getAvailableEditors(): Observable<void> {
    return this.apiService.get<User[]>(`/users/editors/available`).pipe(
      map((res) => {
        this.editors$.next(res)
      }),
      catchError((errors) => of(this.errors$.next(errors.error))),
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
          this._snackBar.open('Translator appointed successfully', 'OK')
        }),
        catchError((errors) => of(this.errors$.next(errors.error))),
      )
  }

  getSubmissionText(submissionId: number): Observable<void> {
    return this.apiService
      .get<Submission>(`/task/submissions/${submissionId}`)
      .pipe(
        map((res) => {
          this.submission$.next(res)
        }),
        catchError((errors) => of(this.errors$.next(errors.error))),
      )
  }

  sendSubmissionToEditor(
    projectId: number,
    taskId: number,
    data: SendSubmissionToEditor,
  ): Observable<void> {
    return this.apiService
      .post<
        void,
        SendSubmissionToEditor
      >(`/task/${projectId}/${taskId}/submissions`, data)
      .pipe(
        tap(() => {
          this.router.navigate(['..'])
          this.snackbar.open('Succesfully submitted for approving', 'OK')
        }),
        catchError((errors) => of(this.errors$.next(errors.error))),
      )
  }

  submissionReject(
    projectId: number,
    taskId: number,
    submissionId: number,
    data: SubmissionComment,
  ): Observable<void> {
    return this.apiService
      .put<
        void,
        SubmissionComment
      >(`/task/${projectId}/${taskId}/submission/${submissionId}/reject`, data)
      .pipe(
        tap(() => {
          this.router.navigate(['.'])
          this.snackbar.open('Succesfully send', 'OK')
        }),
        catchError((errors) => of(this.errors$.next(errors.error))),
      )
  }

  submissionApprove(
    projectId: number,
    taskId: number,
    submissionId: number,
    data: SubmissionApprove,
  ): Observable<void> {
    return this.apiService
      .put<
        void,
        SubmissionApprove
      >(`/task/${projectId}/${taskId}/submission/${submissionId}/grade`, data)
      .pipe(
        tap(() => {
          this.router.navigate(['.'])
        }),
        catchError((errors) => of(this.errors$.next(errors.error))),
      )
  }

  setTaskDeadline(
    projectId: number,
    taskId: number,
    data: SetDeadline,
  ): Observable<void> {
    return this.apiService
      .put<
        void,
        SetDeadline
      >(`/task/${projectId}/${taskId}/translator/deadline`, data)
      .pipe(
        tap(() => {
          const taskDetail = this.taskDetail$.value
          taskDetail!.deadline = data.deadline as Date
          this.taskDetail$.next(taskDetail)
          this._snackBar.open('Task deadline set successfully', 'OK')
        }),
        catchError((errors) => of(this.errors$.next(errors.error))),
      )
  }

  filterTasks(input: string): void {
    const tasks = this.tasksList$.value

    const filteredTasks = tasks!.filter((task) => {
      // Фильтрация по id, name или description
      return (
        task.code.toString().includes(input) ||
        task.name.toLowerCase().includes(input.toLowerCase()) ||
        task.description.toLowerCase().includes(input.toLowerCase())
      )
    })

    this.filteredTasksList$.next(filteredTasks)
  }

  sortTasksByStatus(status: string): void {
    const tasks = this.tasksList$.value
    const filteredTasks = tasks!.filter((task) => {
      // Фильтрация по id, name или description
      return task.status.toString().includes(status)
    })
    this.filteredTasksList$.next(filteredTasks)
  }

  saveText(projectId: number, taskId: number, text: string) {
    localStorage.setItem(`submission${projectId}${taskId}`, text)
  }

  getText(projectId: number, taskId: number) {
    return localStorage.getItem(`submission${projectId}${taskId}`)
  }

  deleteText(projectId: number, taskId: number) {
    localStorage.removeItem(`submission${projectId}${taskId}`)
  }
}
