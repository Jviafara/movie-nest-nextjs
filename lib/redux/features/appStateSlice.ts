import { createSlice } from '@reduxjs/toolkit'

export interface IAppState {
  appState: string
}

const initialState: IAppState = {
  appState: 'home',
}

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setAppState: (state, action) => {
      state.appState = action.payload
    },
  },
})

export const { setAppState } = appStateSlice.actions

export default appStateSlice.reducer
