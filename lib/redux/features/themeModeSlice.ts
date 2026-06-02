import { createSlice } from '@reduxjs/toolkit'

export interface IThemeMode {
  themeMode: string
}

const initialState: IThemeMode = {
  themeMode: 'dark',
}

export const themeModeSlice = createSlice({
  name: 'themeMode',
  initialState,
  reducers: {
    setThemeMode: (state, action) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('themeMode', action.payload)
      }
      state.themeMode = action.payload
    },
  },
})

export const { setThemeMode } = themeModeSlice.actions

export default themeModeSlice.reducer
