import {inject} from '@angular/core'
import {Router} from '@angular/router'
import {LocalStorageJwtService} from './local-storage-jwt.service'
import {ProfileService} from '../../../pages/profile/services/profile.service'

export const adminGuard = () => {
  const router = inject(Router)
  const storage = inject(LocalStorageJwtService)
  const profileService = inject(ProfileService)
  const user$ = profileService.user.value

  return !(!storage.getToken() && !(user$?.role === 'admin'))
}
