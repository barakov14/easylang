import {Routes} from '@angular/router'
import {HomeComponent} from './pages/home/home.component'
import {authGuard} from './core/auth/services/auth.guard'
import {adminGuard} from './core/auth/services/role.guard'
import {blockGuard} from './core/auth/services/block.guard'

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'events',
        loadComponent: () =>
          import('./pages/notification/notification.component').then(
            (c) => c.NotificationComponent,
          ),
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent,
          ),
      },
      {
        path: 'project/:id',
        loadComponent: () =>
          import('./pages/task/tasks-list/tasks-list.component').then(
            (c) => c.TasksListComponent,
          ),
      },
      {
        path: 'project/:id/:taskId',
        loadComponent: () =>
          import('./pages/task/task-detail/task-detail.component').then(
            (c) => c.TaskDetailComponent,
          ),
      },
      {
        path: 'project/:id/:taskId/submission',
        loadComponent: () =>
          import('./pages/task/task-submission/task-submission.component').then(
            (c) => c.TaskSubmissionComponent,
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.component').then(
            (c) => c.ProfileComponent,
          ),
      },
      {
        path: 'rating',
        loadComponent: () =>
          import('./pages/rating/rating.component').then(
            (c) => c.RatingComponent,
          ),
      },
    ],
  },
  {
    path: 'login',
    canActivate: [blockGuard],
    loadComponent: () =>
      import('./core/auth/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'users',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./pages/users/users-list/users-list.component').then(
        (c) => c.UsersListComponent,
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./shared/ui/pages-not-found/pages-not-found.component').then(
        (c) => c.PagesNotFoundComponent,
      ),
  },
]
