import { combineReducers, configureStore } from '@reduxjs/toolkit'
import themeModeSlice from './features/themeModeSlice'
import appStateSlice from './features/appStateSlice'
import authModalSlice from './features/authModalSlice'
import globalLoadingSlice from './features/globalLoadingSlice'
import favoriteSlice from './features/favoriteSlice'

const rootReducer = combineReducers({
  themeMode: themeModeSlice,
  appState: appStateSlice,
  authModalOpen: authModalSlice,
  globalLoading: globalLoadingSlice,
  favoriteList: favoriteSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
