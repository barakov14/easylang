import {createFeatureSelector, createSelector} from '@ngrx/store'
import {GlobalState} from './global.state'
import {featureKey} from './global.reducer'

export const selectFeature = createFeatureSelector<GlobalState>(featureKey)

export const selectProjectsList = createSelector(
  selectFeature,
  (state: GlobalState) => state.filteredProjectsList,
)

export const selectLastProjectsList = createSelector(
  selectFeature,
  (state: GlobalState) => state.lastProjectsList,
)

export const selectNotificationsCount = createSelector(
  selectFeature,
  (state: GlobalState) => state.notificationsCount,
)

export const selectProjectInfo = createSelector(
  selectFeature,
  (state: GlobalState) => state.projectInfo,
)

export const selectTasksList = createSelector(
  selectFeature,
  (state: GlobalState) => state.projectFilteredTasksList,
)
