import {inject, Injectable} from "@angular/core";
import {LocalStorageJwtService} from "./local-storage-jwt.service";
import {AuthResponse, LoginRequest, RegisterRequest} from "../../api-types/auth";
import {ApiService} from "../../http/api.service";
import {catchError, map, Observable, of} from "rxjs";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})

export class AuthService {
  private readonly localStorageJwtService = inject(LocalStorageJwtService)
  private readonly apiService = inject(ApiService)
  private readonly router = inject(Router)

  public login(data: LoginRequest): Observable<AuthResponse | void> {
    return this.apiService.post<AuthResponse, LoginRequest>('/login', data).pipe(
      map((res) => {
        this.router.navigateByUrl('/project')
        this.localStorageJwtService.setItem(res.token)
      }),
      catchError(() => of(console.log('Backend errors here')))
    )
  }

  public register(data: RegisterRequest): Observable<AuthResponse | void> {
    return this.apiService.post<AuthResponse, LoginRequest>('/login', data).pipe(
      map((res) => {
        this.router.navigateByUrl('/project')
        this.localStorageJwtService.setItem(res.token)
      }),
      catchError(() => of(console.log('Backend errors here')))
    )
  }
}
