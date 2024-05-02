import {createFeature, createReducer, on} from '@ngrx/store'
import {initialState} from './global.state'
import {globalActions} from './global.actions'

export const featureKey = 'global'

export const globalFeature = createFeature({
  name: 'global',
  reducer: createReducer(
    initialState,

    on(globalActions.loadProjectsListSuccess, (state, action) => ({
      ...state,
      projectsList: action.projectsList,
    })),

    on(globalActions.getNotificationCountSuccess, (state, action) => ({
      ...state,
      notificationsCount: action.notificationsCount,
    })),

    on(globalActions.getLastProjectsListSuccess, (state, action) => ({
      ...state,
      lastProjectsList: action.projectsList,
      filteredProjectsList: action.projectsList,
    })),

    on(globalActions.deleteProjectSuccess, (state, action) => {
      const updatedProjects = state.projectsList!.filter(
        (project) => project.id !== action.projectId,
      )
      const updatedLastProjects = state.projectsList!.filter(
        (project) => project.id !== action.projectId,
      )

      return {
        ...state,
        projectsList: updatedProjects,
        lastProjectsList: updatedLastProjects,
      }
    }),

    on(globalActions.setProjectEditorSuccess, (state, action) => {
      let projectEditors = state.projectEditors
      projectEditors!.push(action.editor)
      let updatedProjectInfo = state.projectInfo
      updatedProjectInfo!.editors = projectEditors!
      return {
        ...state,
        projectInfo: updatedProjectInfo,
      }
    }),

    on(globalActions.loadTasksListSuccess, (state, action) => ({
      ...state,
      projectTasksList: action.tasksList,
      projectFilteredTasksList: action.tasksList,
    })),

    on(globalActions.addTaskSuccess, (state, action) => {
      let tasksList = state.projectTasksList
      tasksList!.push(action.task)
      return {
        ...state,
        projectTasksList: tasksList,
      }
    }),

    on(globalActions.filterTasksList, (state, action) => {
      const tasks = state.projectTasksList

      const filteredTasks = tasks!.filter((task) => {
        // Фильтрация по id, name или description
        return (
          task.code.toString().includes(action.emit) ||
          task.name.toLowerCase().includes(action.emit.toLowerCase()) ||
          task.description.toLowerCase().includes(action.emit.toLowerCase())
        )
      })

      return {
        ...state,
        projectFilteredTasksList: filteredTasks,
      }
    }),
    on(globalActions.sortTasksList, (state, action) => {
      const tasks = state.projectTasksList

      const sortedTasks = tasks!.filter((task) => {
        // Фильтрация по id, name или description
        return task.status.toString().includes(action.emit)
      })

      return {
        ...state,
        projectFilteredTasksList: sortedTasks,
      }
    }),

    on(globalActions.filterProjectsList, (state, action) => {
      const projects = state.projectsList

      const filteredProjects = projects!.filter((project) => {
        // Фильтрация по id, name или description
        return (
          project.code.toString().includes(action.emit) ||
          project.name.toLowerCase().includes(action.emit.toLowerCase()) ||
          project.description.toLowerCase().includes(action.emit.toLowerCase())
        )
      })

      return {
        ...state,
        filteredProjectsList: filteredProjects,
      }
    }),
    on(globalActions.sortProjectsList, (state, action) => {
      const projects = state.projectsList
      const sortedProjects = projects!.filter((project) => {
        // Фильтрация по id, name или description
        return project.status.toString().includes(action.emit)
      })

      return {
        ...state,
        filteredProjectsList: sortedProjects,
      }
    }),
  ),
})
