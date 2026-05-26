import { Favorite } from '@/lib/types'
import { createSlice } from '@reduxjs/toolkit'

export interface IFavoriteSlice {
  favoriteList: Favorite[]
}

const initialState: IFavoriteSlice = {
  favoriteList: [],
}

export const favoriteSlice = createSlice({
  name: 'favoriteList',
  initialState,
  reducers: {
    setListFavorites: (state, action) => {
      state.favoriteList = action.payload
    },
    removeFavorite: (state, action) => {
      const { mediaId } = action.payload
      state.favoriteList = [...state.favoriteList].filter(e => e.mediaId !== mediaId)
    },
    addFavorite: (state, action) => {
      state.favoriteList = [action.payload, ...state.favoriteList]
    },
  },
})

export const { setListFavorites, removeFavorite, addFavorite } = favoriteSlice.actions
export default favoriteSlice.reducer
