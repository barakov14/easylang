import {inject, Injectable} from "@angular/core";
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";
import {CreateTask, Task} from "../../core/api-types/task";
import {ApiService} from "../../core/http/api.service";
import {Project} from "../../core/api-types/project";

@Injectable()

export class TaskService {
  private readonly apiService = inject(ApiService)

  public tasksList$ = new BehaviorSubject<Task[] | null | undefined>(null);

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
}
