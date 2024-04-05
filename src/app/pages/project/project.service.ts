import {inject, Injectable} from "@angular/core";
import {ApiService} from "../../core/http/api.service";
import {BehaviorSubject, catchError, concatMap, map, Observable, of, switchMap, tap} from "rxjs";
import {CreateProject, Project} from "../../core/api-types/project";

@Injectable({providedIn: 'root'})

export class ProjectService {
  private readonly apiService = inject(ApiService)
  public projectsList$ = new BehaviorSubject<Project[] | null | undefined>(null)
  getProjectsList(): Observable<void> {
    return this.apiService.get<Project[]>('/projects').pipe(
      map((res) => {
        this.projectsList$.next(res)
      }),
      catchError(() => of(console.log('Error fetching projects list')))
    )
  }

  addProject(data: CreateProject) {
    return this.apiService.post<Project, CreateProject>('/projects', data).pipe(
      map((res: Project) => {
        const currentProjects: Project[] = this.projectsList$.value as Project[];
        const updatedProjects: Project[] = [...currentProjects, res];
        this.projectsList$.next(updatedProjects);
        }
      ),
      catchError((error) => {
        console.log('Error adding project', error);
        return of();
      })
    );
  }
}
