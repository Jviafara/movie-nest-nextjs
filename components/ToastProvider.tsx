'use client'

import { useAppSelector } from '@/lib/hooks/redux.hooks'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function ToastProvider({ children }: { children: React.ReactNode }) {
  const { themeMode } = useAppSelector(state => state.themeMode)
  return (
    <>
      {children}
      <ToastContainer
        position='bottom-left'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      />
    </>
  )
}
