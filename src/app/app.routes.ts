import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {authGuard} from "./core/auth/services/auth.guard";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'project',
        loadComponent: () =>
          import('./pages/project/projects-list/projects-list.component').then(
            (c) => c.ProjectsListComponent
          )
      },
      {
        path: 'project/:id',
        loadComponent: () =>
          import('./pages/task/tasks-list/tasks-list.component').then(
            (c) => c.TasksListComponent
          )
      },
      {
        path: 'project/:id/:taskId',
        loadComponent: () =>
          import('./pages/task/task-detail/task-detail.component').then(
            (c) => c.TaskDetailComponent
          )
      },
      {
        path: 'project/:id/:taskId/:submissionId',
        loadComponent: () =>
          import('./pages/task/task-submission/task-submission.component').then(
            (c) => c.TaskSubmissionComponent
          )
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/profile/profile.component').then(
            (c) => c.ProfileComponent
          )
      },
      {
        path: 'invitation',
        loadComponent: () =>
          import('./pages/invitation/invitation.component').then(
            (c) => c.InvitationComponent
          )
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./core/auth/login/login.component').then(
        (c) => c.LoginComponent
      )
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./core/auth/register/register.component').then(
        (c) => c.RegisterComponent
      )
  },
];
