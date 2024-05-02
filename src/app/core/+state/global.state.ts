import {Project} from '../api-types/project'
import {ErrorResponse} from '../api-types/error'
import {User} from '../api-types/user'
import {Task} from '../api-types/task'

export interface GlobalState {
  projectsList: Project[] | null | undefined
  filteredProjectsList: Project[] | null | undefined
  lastProjectsList: Project[] | null | undefined
  projectInfo: Project | null | undefined
  notificationsCount: number
  projectEditors: User[] | null | undefined
  projectTasksList: Task[] | null | undefined
  projectFilteredTasksList: Task[] | null | undefined
}

export const initialState: GlobalState = {
  projectsList: null,
  filteredProjectsList: null,
  lastProjectsList: null,
  notificationsCount: 0,
  projectInfo: null,
  projectEditors: null,
  projectTasksList: null,
  projectFilteredTasksList: null,
}
