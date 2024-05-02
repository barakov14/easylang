import {ApplicationConfig} from '@angular/core'
import {provideRouter} from '@angular/router'

import {routes} from './app.routes'
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async'
import {provideHttpClient, withInterceptors} from '@angular/common/http'
import {tokenInterceptor} from './core/auth/services/token-interceptor.service'
import {API_URL} from './core/http/api-url.token'
import {environment} from '../environments/environment.development'
import {provideStore} from '@ngrx/store'
import {provideEffects} from '@ngrx/effects'
import {GlobalEffects} from './core/+state/global.effects'
import {globalFeature} from './core/+state/global.reducer'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    {
      provide: API_URL,
      useValue: environment.api_url,
    },
    provideStore({
      [globalFeature.name]: globalFeature.reducer,
    }),
    provideEffects(GlobalEffects),
  ],
}
