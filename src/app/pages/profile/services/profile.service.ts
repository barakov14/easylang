import {inject, Injectable} from "@angular/core";
import {BehaviorSubject, catchError, map, Observable, of, tap} from "rxjs";
import {ApiService} from "../../../core/http/api.service";
import {User} from "../../../core/api-types/user";

@Injectable()

export class ProfileService {
  private readonly apiService = inject(ApiService)
  public user = new BehaviorSubject<User | null | undefined>(null)
  getUserInformation(): Observable<User> {
    return this.apiService.get<User>('/user').pipe(
      tap((res) => {
        this.user.next(res);
      }),
      catchError(() => {
        console.log('Error occurred');
        return of(); // Возвращаем пустой Observable в случае ошибки
      })
    );
  }
}
