'use client'
import { useEffect, useState } from 'react'
import LogoSpinner from './LogoSpinner'
import { useAppSelector } from '@/lib/hooks/redux.hooks'
import { motion } from 'framer-motion'

const GlobalLoading = () => {
  const globalLoading = useAppSelector(state => state.globalLoading)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const setLoading = () => {
      if (globalLoading) {
        setIsLoading(true)
      } else {
        setTimeout(() => {
          setIsLoading(false)
        }, 500)
      }
    }
    setLoading()
  }, [globalLoading])

  return (
    <>
      {isLoading && (
        <div className='absolute w-screen h-screen backdrop-blur-lg z-999'>
          <div className='flex flex-col items-center gap-4 absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]'>
            <LogoSpinner />
            <motion.div
              style={{
                width: '75px',
                height: '75px',
                border: '8px solid transparent', // Light grey background
                borderTop: '8px solid var(--secondary)', // Blue highlight
                borderLeft: '8px solid var(--secondary)', // Blue highlight
                borderRadius: '50%',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              //   className='text-secondary'
            />
          </div>
        </div>
      )}
    </>
  )
}

export default GlobalLoading
