import {inject} from '@angular/core'
import {Router} from '@angular/router'
import {LocalStorageJwtService} from './local-storage-jwt.service'

export const blockGuard = () => {
  const router = inject(Router)
  const storage = inject(LocalStorageJwtService)

  if (storage.getToken()) {
    router.navigate(['/dashboard'])
    return false
  }
  return true
}
