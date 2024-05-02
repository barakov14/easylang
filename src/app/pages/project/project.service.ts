import {inject, Injectable} from '@angular/core'
import {ApiService} from '../../core/http/api.service'
import {BehaviorSubject, catchError, map, Observable, of, tap} from 'rxjs'
import {CreateProject, Project} from '../../core/api-types/project'
import {MatSnackBar} from '@angular/material/snack-bar'
import {ErrorResponse} from '../../core/api-types/error'

@Injectable({providedIn: 'root'})
export class ProjectService {
  private readonly apiService = inject(ApiService)
  public projectsList$ = new BehaviorSubject<Project[] | null | undefined>(null)
  public lastProjectsList$ = new BehaviorSubject<Project[] | null | undefined>(
    null,
  )

  public filteredProjects$ = new BehaviorSubject<Project[] | null | undefined>(
    null,
  )

  public errors$ = new BehaviorSubject<null | ErrorResponse>(null)

  private readonly _snackBar = inject(MatSnackBar)
  getProjectsList(): Observable<Project[]> {
    return this.apiService.get<Project[]>('/projects').pipe(
      /*tap((res) => {
        this.projectsList$.next(res)
        this.filteredProjects$.next(res)
      }),*/
      catchError((errors) => {
        this.errors$.next(errors.error)
        return of([])
      }),
    )
  }

  addProject(data: CreateProject) {
    return this.apiService.post<Project, CreateProject>('/projects', data).pipe(
      /*tap((res: Project) => {
        console.log(res)
        const currentProjects: Project[] = this.projectsList$.value as Project[]
        const updatedProjects: Project[] = [...currentProjects, res]

        const currentLastProjects: Project[] = this.lastProjectsList$
          .value as Project[]
        const updatedLastProjects: Project[] = [...currentLastProjects, res]

        this.projectsList$.next(updatedProjects)
        this.lastProjectsList$.next(updatedLastProjects)
        this._snackBar.open('Project created successfully', 'OK')
      }),*/
      catchError((errors) => {
        this.errors$.next(errors.error)
        return of()
      }),
    )
  }

  getLastProjects(): Observable<Project[]> {
    return this.apiService.get<Project[]>('/projects/user').pipe(
      /*tap((res) => {
        this.lastProjectsList$.next(res)
      }),*/
      catchError((errors) => {
        this.errors$.next(errors.error)
        return of()
      }),
    )
  }

  deleteProject(id: number): Observable<void> {
    return this.apiService.delete<void>(`/projects/${id}`).pipe(
      /*tap(() => {
        const updatedProjects = this.projectsList$.value?.filter(
          (project) => project.id !== id,
        )
        const updatedLastProjects = this.lastProjectsList$.value?.filter(
          (project) => project.id !== id,
        )
        this.projectsList$.next(updatedProjects)
        this.lastProjectsList$.next(updatedLastProjects)
        this._snackBar.open('Project deleted successfully', 'OK')
      }),*/
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
