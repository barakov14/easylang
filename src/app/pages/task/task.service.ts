import {inject, Injectable} from "@angular/core";
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";
import {CreateTask, Task} from "../../core/api-types/task";
import {ApiService} from "../../core/http/api.service";
import {Project} from "../../core/api-types/project";
import {Submission} from "../../core/api-types/submissions";
import {User} from "../../core/api-types/user";

@Injectable()

export class TaskService {
  private readonly apiService = inject(ApiService)

  public tasksList$ = new BehaviorSubject<Task[] | null | undefined>(null);
  public taskDetail$ = new BehaviorSubject<Task | null | undefined>(null);
  public submissions$ = new BehaviorSubject<Submission[] | null | undefined>(null);
  public editors$ = new BehaviorSubject<User[] | null | undefined>(null)

  getTasksList(projectId: number): Observable<void> {
    return this.apiService.get<Task[]>(`/task/${projectId}`).pipe(
      map((res) => {
        this.tasksList$.next(res)
      }),
      catchError(() => of(console.log('error')))
    )
  }

  addTask(data: CreateTask, projectId: number): Observable<void> {
    console.log(projectId)
    return this.apiService.post<Task, CreateTask>(`/task/${projectId}`, data).pipe(
      map((res) => {
        const currentTasks: Task[] = this.tasksList$.value as Task[];
        const updatedTasks: Task[] = [...currentTasks, res];
        this.tasksList$.next(updatedTasks);
      }),
      catchError(() => of(console.log('error')))
    )
  }

  getTaskDetail(projectId: number, taskId: number): Observable<void> {
    return this.apiService.get<Task>(`/task/${projectId}/${taskId}`).pipe(
      map((res) => {
        this.taskDetail$.next(res);
      }),
      catchError(() => of(console.log('error task detail')))
    )
  }

  getTaskSubmissions(projectId: number, taskId: number): Observable<void> {
    return this.apiService.get<Submission[]>(`/task/${projectId}/${taskId}/submissions`).pipe(
      map((res) => {
        this.submissions$.next(res)
      }),
      catchError(() => of(console.log('error submissions')))
    )
  }

  getEditorsList(): Observable<void> {
    return this.apiService.get<User[]>(`/users/editors`).pipe(
      map((res) => {
        this.editors$.next(res)
      }),
      catchError(() => of(console.log('error editors')))
    )
  }

}
