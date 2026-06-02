'use client'

import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux.hooks'
import { setAuthModalOpen } from '@/lib/redux/features/authModalSlice'
import { motion } from 'framer-motion'
import Logo from './Logo'
import { useState } from 'react'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

const actionState = {
  signin: 'signin',
  signup: 'signup',
}

const AuthModal = () => {
  const { authModalOpen } = useAppSelector(state => state.authModalOpen)
  const dispatch = useAppDispatch()

  const [action, setAction] = useState(actionState.signin)

  const switchAuthState = (state: string) => {
    setAction(state)
  }
  const handleClickOutside = () => {
    dispatch(setAuthModalOpen(false))
    setAction(actionState.signin)
  }

  return (
    <>
      {authModalOpen && (
        <motion.div
          key='modal'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className='fixed inset-0 z-50 flex items-center justify-center'
        >
          {/* <!-- Backdrop with Fade-In Blur --> */}
          <div
            className='absolute inset-0 bg-black/50 backdrop-blur-sm'
            onClick={handleClickOutside}
          ></div>

          {/* <!-- Modal Content with Scale-In Animation --> */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            id='modal-box'
            className='w-[90%] md:max-w-150  rounded-xl absolute top-[20%] translate-y-[-20%] md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 text-black '
          >
            <div className='bg-gray-300 bg-opacity-70 rounded-xl p-4 lg:p-8'>
              <div className='mb-4 flex justify-center'>
                <Logo />
              </div>
              {action === actionState.signin && (
                <SignInForm switchAuthState={() => switchAuthState(actionState.signup)} />
              )}
              {action === actionState.signup && (
                <SignUpForm switchAuthState={() => switchAuthState(actionState.signin)} />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

export default AuthModal
