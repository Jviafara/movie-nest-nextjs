'use client'
import { useEffect, useRef, useState } from 'react'
import LogoSpinner from './LogoSpinner'
import { useAppSelector } from '@/lib/hooks/redux.hooks'
import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'

const GlobalLoading = () => {
  const globalLoading = useAppSelector(state => state.globalLoading)
  const pathname = usePathname()

  const [routeLoading, setRouteLoading] = useState(false)
  const previousPathname = useRef(pathname)

  useEffect(() => {
    const firstLoading = () => {
      setRouteLoading(true)

      const timeout = window.setTimeout(() => {
        setRouteLoading(false)
      }, 500)

      return () => {
        window.clearTimeout(timeout)
      }
    }
    firstLoading()
  }, [])

  useEffect(() => {
    if (previousPathname.current === pathname) return

    previousPathname.current = pathname
    setRouteLoading(true)

    const timeout = window.setTimeout(() => {
      setRouteLoading(false)
    }, 500)

    return () => {
      window.clearTimeout(timeout)
    }
  }, [pathname])

  const isLoading = globalLoading || routeLoading

  if (!isLoading) return null

  return (
    <div className='fixed inset-0 z-9999 backdrop-blur-lg'>
      <div className='flex flex-col items-center gap-4 absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]'>
        <LogoSpinner />
        <motion.div
          style={{
            width: '75px',
            height: '75px',
            border: '8px solid transparent',
            borderTop: '8px solid var(--secondary)',
            borderLeft: '8px solid var(--secondary)',
            borderRadius: '50%',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </div>
  )
}

export default GlobalLoading
