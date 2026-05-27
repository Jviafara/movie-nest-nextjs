'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux.hooks'
import { setThemeMode } from '@/lib/redux/features/themeModeSlice'
import { useSession } from '@/lib/auth/auth-client'
import { setFavoriteList } from '@/lib/redux/features/favoriteSlice'

export default function ThemeProvider() {
  const dispatch = useAppDispatch()
  const { themeMode } = useAppSelector(state => state.themeMode)

  const { data: session } = useSession()

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await fetch('/api/favorite', {
          method: 'GET',
          credentials: 'include',
        })

        const data = await response.json()
        dispatch(setFavoriteList(data))
      } catch (err) {
        dispatch(setFavoriteList(null))
        console.error(err)
      }
    }
    if (!session?.user) return
    fetchFavorites()
  }, [dispatch, session])

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('themeMode')

    if (savedTheme && savedTheme !== themeMode) {
      dispatch(setThemeMode(savedTheme))
    }
  }, [dispatch, themeMode])

  useEffect(() => {
    const htmlElement = document.documentElement

    if (themeMode === 'dark') {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }
  }, [themeMode])

  return null
}
