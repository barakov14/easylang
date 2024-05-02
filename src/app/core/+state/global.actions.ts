import {createActionGroup, emptyProps, props} from '@ngrx/store'
import {CreateProject, Project} from '../api-types/project'
import {ErrorResponse} from '../api-types/error'
import {CreateTask, Task} from '../api-types/task'
import {User} from '../api-types/user'

export const globalActions = createActionGroup({
  source: 'Article',
  events: {
    loadProjectsList: emptyProps(),
    loadProjectsListSuccess: props<{projectsList: Project[]}>(),
    loadProjectsListFailure: props<{errorResponse: ErrorResponse}>(),

    getNotificationCount: emptyProps(),
    getNotificationCountSuccess: props<{notificationsCount: number}>(),
    getNotificationCountFailure: props<{errorResponse: ErrorResponse}>(),

    getLastProjectsList: emptyProps(),
    getLastProjectsListSuccess: props<{projectsList: Project[]}>(),
    getLastProjectsListFailure: props<{projectsList: Project[]}>(),

    filterProjectsList: props<{emit: string}>(),
    sortProjectsList: props<{emit: string}>(),

    addProject: props<{data: CreateProject}>(),
    addProjectSuccess: props<{project: Project}>(),
    addProjectFailure: props<{errorResponse: ErrorResponse}>(),

    deleteProject: props<{projectId: number}>(),
    deleteProjectSuccess: props<{projectId: number}>(),
    deleteProjectFailure: props<{errorResponse: ErrorResponse}>(),

    setProjectEditor: props<{projectId: number; editor: User}>(),
    setProjectEditorSuccess: props<{editor: User}>(),
    setProjectEditorFailure: props<{editor: ErrorResponse}>(),

    loadTasksList: props<{projectId: number}>(),
    loadTasksListSuccess: props<{tasksList: Task[]}>(),
    loadTasksListFailure: props<{errorResponse: ErrorResponse}>(),

    addTask: props<{data: CreateTask; projectId: number}>(),
    addTaskSuccess: props<{task: Task}>(),
    addTaskFailure: props<{errorResponse: ErrorResponse}>(),

    filterTasksList: props<{emit: string}>(),
    sortTasksList: props<{emit: string}>(),

    getProjectInfo: props<{projectId: string}>(),
    getProjectInfoSuccess: props<{projectInfo: Project}>(),
    getProjectInfoFailure: props<{errorResponse: ErrorResponse}>(),
  },
})
