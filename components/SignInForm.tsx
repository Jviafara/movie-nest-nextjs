'use client'

import { signIn } from '@/lib/auth/auth-client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'

interface ISignInForm {
  switchAuthState: () => void
}

const SignInForm = ({ switchAuthState }: ISignInForm) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await signIn.email({ email, password })
      if (result.error) {
        setError(result.error.message ?? 'Error al iniciar sesión, Intenta nuevamente.')
      } else {
        router.push('/')
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
      console.log(result)
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
      <div className='space-y-1 p-6'>
        <h2 className='text-2xl font-bold text-black'>Inicia sesión</h2>
        <p className='text-sm text-gray-500'>Ingresa tu correo y contraseña para iniciar sesión.</p>
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
              className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
            />
          </div>

          {/* Password */}
          <div className='space-y-2'>
            <label
              htmlFor='password'
              className='text-sm font-medium text-black'
            >
              Contraseña
            </label>

            <input
              id='password'
              type='password'
              placeholder='Ingresa tu contraseña'
              required
              minLength={8}
              className='w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
            />
          </div>
        </div>

        <hr />

        {/* Actions */}
        <div className='flex flex-col space-y-4 px-6 pb-6'>
          <button
            type='submit'
            className='w-full rounded-md bg-blue-600 py-2 text-lg font-medium text-white transition hover:bg-blue-500'
          >
            Iniciar sesión
          </button>

          <p className='text-center text-sm text-gray-500'>
            Aun no tienes tu cuenta?
            <button
              type='button'
              onClick={switchAuthState}
              className='font-semibold text-blue-600 hover:underline'
            >
              Crear cuenta
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

          <p className='font-semibold text-gray-700'>Inicia sesión con Google</p>
        </button>
      </div>
    </>
  )
}

export default SignInForm
