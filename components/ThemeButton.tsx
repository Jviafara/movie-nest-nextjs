'use client'

import { Moon, Sun } from 'lucide-react'
import { setThemeMode } from '@/lib/redux/features/themeModeSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux.hooks'

const ThemeButton = () => {
  const { themeMode } = useAppSelector(state => state.themeMode)
  const dispatch = useAppDispatch()

  const themeToggle = () => {
    const theme = themeMode === 'dark' ? 'light' : 'dark'
    dispatch(setThemeMode(theme))
  }
  return (
    <div>
      <button onClick={themeToggle}>
        {themeMode === 'dark' ? (
          <Sun
            size={24}
            className='text-primary'
          />
        ) : (
          <Moon
            size={24}
            className='text-primary'
          />
        )}
      </button>
    </div>
  )
}

export default ThemeButton
