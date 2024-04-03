import {inject, Injectable} from "@angular/core";
import {ApiService} from "../../core/http/api.service";
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";
import {Project} from "../../core/api-types/project";

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
}
