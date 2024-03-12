import {Injectable} from '@angular/core'
@Injectable({
  providedIn: 'root',
})
export class LocalStorageJwtService {
  getToken(): string | null {
    return localStorage.getItem('jwtToken') || null
  }

  getUuid(): string | null {
    return localStorage.getItem('uuid') || null
  }

  setItem(data: string, uuid: string): string {
    localStorage.setItem('jwtToken', data)
    localStorage.setItem('uuid', uuid)
    return data
  }

  removeItem(): boolean {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('uuid')
    return true
  }
}
