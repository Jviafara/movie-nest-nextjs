'use client'

import { signIn } from '@/lib/auth/auth-client'
import { useState } from 'react'
import Image from 'next/image'
import { useAppDispatch } from '@/lib/hooks/redux.hooks'
import { setAuthModalOpen } from '@/lib/redux/features/authModalSlice'

interface ISignInForm {
  switchAuthState: () => void
}

const SignInForm = ({ switchAuthState }: ISignInForm) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn.email({ email, password })
      if (result.error) {
        setError(result.error.message ?? 'Error al iniciar sesión, Intenta nuevamente.')
      } else {
        dispatch(setAuthModalOpen(false))
      }
    } catch (e) {
      setError('Error al iniciar sesión, Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setLoading(true)

    try {
      const result = await signIn.social({ provider: 'google' })
      if (result.error) {
        setError(result.error.message ?? 'Error al iniciar sesión, Intenta nuevamente.')
      }
    } catch (e) {
      setError('Error al iniciar sesión, Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* {/* Header */}
      <div className='space-y-1 w-full flex flex-col items-center justify-center'>
        <h2 className='text-2xl font-bold text-black'>Sign In</h2>
        <p className='text-sm text-gray-500'>Enter your email and password</p>
      </div>

      {/* Form */}
      <form
        className='space-y-4'
        onSubmit={handleSubmit}
      >
        <div className='space-y-4 px-6'>
          {/*  Error  */}
          {error && <div className='rounded-md bg-red-100 p-3 text-sm text-red-600'>{error}</div>}

          {/* Email */}
          <div className='space-y-2'>
            <label
              htmlFor='email'
              className='text-sm font-medium text-black'
            >
              E-mail
            </label>

            <input
              id='email'
              type='email'
              placeholder='john@example.com'
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
            />
          </div>

          {/* Password */}
          <div className='space-y-2'>
            <label
              htmlFor='password'
              className='text-sm font-medium text-black'
            >
              Password
            </label>

            <input
              id='password'
              type='password'
              placeholder='Enter your password'
              required
              minLength={8}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className='w-full rounded-md border border-gray-400 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
            />
          </div>
        </div>

        {/* Actions */}
        <div className='flex flex-col space-y-4 px-6 pb-6'>
          <button
            type='submit'
            disabled={loading}
            className={`w-full rounded-md  ${loading || password.length < 8 ? 'bg-gray-400' : 'bg-primary/70 transition hover:bg-primary cursor-pointer'}  py-2 text-lg font-medium text-white `}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className='text-center text-sm text-gray-500'>
            Don&apos;t have an account?
            <button
              type='button'
              onClick={switchAuthState}
              className='font-semibold text-blue-600 hover:underline ml-2'
            >
              Sign Up
            </button>
          </p>
        </div>
      </form>

      {/* Footer */}
      <div className='flex w-full flex-col items-center justify-center  p-0'>
        <button
          type='button'
          onClick={() => handleGoogleSignIn()}
          className='flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl  py-3 transition hover:bg-gray-200'
        >
          <Image
            src='/google.png'
            alt='Google Icon'
            width={14}
            height={14}
            className='h-5 w-5'
          />

          <p className='font-semibold text-gray-700'>Sign In with Google</p>
        </button>
      </div>
    </>
  )
}

export default SignInForm
