'use client'

import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux.hooks'
import { setAppState } from '@/lib/redux/features/appStateSlice'
import { useEffect, useRef } from 'react'
import Logo from './Logo'
import menuConfigs, { IMenuConfig } from '@/lib/configs/menu.configs'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signOut, useSession } from '@/lib/auth/auth-client'
import ThemeButton from './ThemeButton'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface ISidebarProps {
  open: boolean
  toggleSidebar: () => void
}

const Sidebar = ({ open, toggleSidebar }: ISidebarProps) => {
  const { data: session } = useSession()
  const sideNavRef = useRef(null)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { appState } = useAppSelector(state => state.appState)

  const handleClick = (item: IMenuConfig) => {
    dispatch(setAppState(item.state))
    toggleSidebar()
    // navigate(item.path)
  }

  const signout = async () => {
    const result = await signOut()
    if (result.data) {
      toggleSidebar()
      router.push('/')
    } else {
      alert('Error cerrar sesión, Intenta nuevamente.')
    }
  }

  if (!open) return null
  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* <!-- Backdrop with Fade-In Blur --> */}
      <div
        className='absolute w-screen h-screen inset-0 backdrop-blur-sm'
        onClick={toggleSidebar}
      ></div>
      <motion.div
        key='modal'
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        ref={sideNavRef}
        id='sidebar'
        className='w-75 h-screen p-4 flex flex-col gap-2 fixed inset-0 z-999 bg-base-100/90 text-black '
      >
        <Logo />
        <h6 className='mt-6 mb-2 font-bold text-xl text-primary'>MENU</h6>
        <ul className='flex flex-col gap-2 ml-4 justify-center  text-primary text-lg'>
          {menuConfigs.main.map((item, index) => (
            <li
              key={index}
              className='font-medium'
            >
              {appState === item.state ? (
                <Link
                  href={item.path}
                  className='uppercase flex gap-2 items-center py-1 bg-secondary px-4 rounded-xl text-white'
                  onClick={() => handleClick(item)}
                >
                  <item.icon size={24} />
                  {item.display}
                </Link>
              ) : (
                <Link
                  href={item.path}
                  className='uppercase flex gap-2 items-center rounded-lg hover:bg-secondary/40 hover:px-2'
                  onClick={() => handleClick(item)}
                >
                  <item.icon size={24} />
                  {item.display}
                </Link>
              )}
            </li>
          ))}
        </ul>
        {session?.user && (
          <div className='sm:hidde'>
            <h6 className='mt-6 mb-2 font-bold text-xl text-primary'>USER</h6>
            <ul className='flex flex-col gap-2 ml-4 justify-center text-primary text-lg'>
              {menuConfigs.user.map((item, index) => (
                <li
                  className='font-medium'
                  key={index}
                >
                  {appState === item.state ? (
                    <button
                      className='uppercase flex gap-2 items-center py-1 bg-secondary px-4 rounded-xl text-white'
                      onClick={() => handleClick(item)}
                    >
                      <item.icon size={24} />
                      {item.display}
                    </button>
                  ) : (
                    <button
                      className='uppercase flex gap-2 items-center rounded-lg hover:bg-secondary/40 hover:px-2'
                      onClick={() => handleClick(item)}
                    >
                      <item.icon size={24} />
                      {item.display}
                    </button>
                  )}
                </li>
              ))}
              <li className='font-medium'>
                <button
                  className='uppercase flex gap-2 items-center rounded-lg hover:bg-secondary/40 hover:px-2'
                  onClick={signout}
                >
                  <LogOut size={24} />
                  <h1>SIGN OUT</h1>
                </button>
              </li>
            </ul>
          </div>
        )}
        <div>
          <h6 className='mt-6 mb-2 font-bold text-xl text-primary'>THEME</h6>
          <div className='ml-4 hover:scale-105 w-fit'>
            <ThemeButton />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Sidebar
