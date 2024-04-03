import {inject, Injectable} from "@angular/core";
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";
import {User} from "../../../core/api-types/user";
import {ApiService} from "../../../core/http/api.service";

@Injectable()

export class ProfileService {
  private readonly apiService = inject(ApiService)

  public user = new BehaviorSubject<User | null | undefined>(null)
  getUserInformation(): Observable<void> {
    return this.apiService.get<User>('/user').pipe(
      map((res) => {
        this.user.next(res)
      }),
      catchError(() => of(console.log('Error occured')))
    )
  }
}
