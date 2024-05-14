import {inject, Injectable} from '@angular/core'
import {ApiService} from '../../core/http/api.service'
import {BehaviorSubject, catchError, map, mergeMap, Observable, of, switchMap, tap} from 'rxjs'
import {CreateProject, Project} from '../../core/api-types/project'
import {MatSnackBar} from '@angular/material/snack-bar'
import {ErrorResponse} from '../../core/api-types/error'

@Injectable({providedIn: 'root'})
export class ProjectService {
  private readonly apiService = inject(ApiService)
  public projectsList$ = new BehaviorSubject<Project[]>([])
  public lastProjectsList$ = new BehaviorSubject<Project[]>(
    [],
  )

  public filteredProjects$ = new BehaviorSubject<Project[]>(
    [],
  )

  public errors$ = new BehaviorSubject<null | ErrorResponse>(null)

  private readonly _snackBar = inject(MatSnackBar)
  getProjectsList(): Observable<Project[]> {
    return this.apiService.get<Project[]>('/projects').pipe(
      tap((res) => {
        this.projectsList$.next(res)
        this.filteredProjects$.next(res)
      }),
      catchError((errors) => {
        this.errors$.next(errors.error)
        return of([])
      }),
    )
  }

  addProject(data: CreateProject): Observable<void> {
    return this.apiService.post<Project, CreateProject>('/projects', data).pipe(
      map((res: Project) => {
        const updatedProjects: Project[] = [res, ...this.projectsList$.value];
        const updatedLastProjects: Project[] = [res, ...this.lastProjectsList$.value];
        this.filteredProjects$.next(updatedProjects);
        this.projectsList$.next(updatedProjects);
        this.lastProjectsList$.next(updatedLastProjects);
        this._snackBar.open('Project created successfully', 'OK');
      }),
      catchError((errors) => {
        this.errors$.next(errors.error);
        return of();
      })
    );
  }


  getLastProjects(): Observable<Project[]> {
    return this.apiService.get<Project[]>('/projects/user').pipe(
      tap((res) => {
        this.lastProjectsList$.next(res)
      }),
      catchError((errors) => {
        this.errors$.next(errors.error)
        return of()
      }),
    )
  }

  deleteProject(id: number): Observable<void> {
    return this.apiService.delete<void>(`/projects/${id}`).pipe(
      tap(() => {
        const updatedProjects = this.projectsList$.value?.filter(
          (project) => project.id !== id,
        )
        const updatedLastProjects = this.lastProjectsList$.value?.filter(
          (project) => project.id !== id,
        )
        this.projectsList$.next(updatedProjects)
        this.lastProjectsList$.next(updatedLastProjects)
        this.filteredProjects$.next(updatedProjects)
        this._snackBar.open('Project deleted successfully', 'OK')
      }),
      catchError((errors) => of(this.errors$.next(errors.error))),
    )
  }

  filterProjects(input: string): void {
    const projects = this.projectsList$.value

    const filteredProjects = projects!.filter((projects) => {
      // Фильтрация по id, name или description
      return (
        projects.code.toString().includes(input) ||
        projects.name.toLowerCase().includes(input.toLowerCase()) ||
        projects.description.toLowerCase().includes(input.toLowerCase())
      )
    })

    this.filteredProjects$.next(filteredProjects)
  }

  sortProjectsByStatus(status: string): void {
    const projects = this.projectsList$.value
    const filteredTasks = projects!.filter((project) => {
      // Фильтрация по id, name или description
      return project.status.toString().includes(status)
    })
    this.filteredProjects$.next(filteredTasks)
  }
}
