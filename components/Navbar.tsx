'use client'

import { useState } from 'react'
// import { setAuthModalOpen } from '../../redux/features/authModalSlice'
// import Sidebar from './Sidebar'
// import UserMenu from './UserMenu'
import { Menu } from 'lucide-react'
import Logo from './Logo'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux.hooks'
import ThemeButton from './ThemeButton'
import menuConfigs from '@/lib/configs/menu.configs'
import Link from 'next/link'
import { setAppState } from '@/lib/redux/features/appStateSlice'
import { IMenuConfig } from '../lib/configs/menu.configs'
import { setAuthModalOpen } from '@/lib/redux/features/authModalSlice'
import { useSession } from '@/lib/auth/auth-client'

const Navbar = () => {
  const { data: session } = useSession()

  const { appState } = useAppSelector(state => state.appState)
  const nameSplit = session?.user?.name.split(' ') || []
  console.log(nameSplit)
  const dispatch = useAppDispatch()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleClick = (item: IMenuConfig) => {
    dispatch(setAppState(item.state))
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const toggleUserMenu = () => {
    // setUserMenuOpen(!userMenuOpen)
    // if (setUserMenuOpen) {
    //   setTimeout(() => {
    //     setUserMenuOpen(false)
    //   }, 5000)
    // }
  }

  return (
    <div className='w-full relative'>
      {/* <Sidebar
        open={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <UserMenu
        open={userMenuOpen}
        toggleUserMenu={toggleUserMenu}
      /> */}
      <div className='absolute w-full h-auto flex justify-between items-center py-4 px-8 bg-base-300/70 '>
        <div className='md:hidden cursor-pointer flex gap-4 items-center justify-between hful'>
          <button
            onClick={toggleSidebar}
            className='hover:scale-105 cursor-pointer'
          >
            <Menu
              size={28}
              color='red'
            />
          </button>

          <Link
            href='/'
            className='mb-1'
          >
            <Logo />
          </Link>
        </div>
        <nav className='hidden md:inline-flex'>
          <div>
            <ul className='flex gap-8 justify-center text-primary'>
              {menuConfigs.main.map((item, index) => (
                <li
                  key={index}
                  className='font-medium'
                >
                  {appState === item.state ? (
                    <Link
                      href={item.path}
                      className='uppercase bg-secondary px-4 rounded-xl text-white'
                      onClick={() => handleClick(item)}
                    >
                      {item.display}
                    </Link>
                  ) : (
                    <Link
                      href={item.path}
                      className='uppercase rounded-lg hover:bg-secondary/40 hover:px-2'
                      onClick={() => handleClick(item)}
                    >
                      {item.display}
                    </Link>
                  )}
                </li>
              ))}
              <li className='hover:scale-110'>
                <ThemeButton />
              </li>
            </ul>
          </div>
        </nav>

        <div className='hover:scale-105 hidden lg:inline-flex lg:absolute lg:top-1/2 lg:left-1/2  lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2'>
          <Link href='/'>
            <Logo />
          </Link>
        </div>
        <div className='sm:hidden cursor-pointer'>
          {session?.user ? (
            <div>
              <h1 className='bg-secondary text-white text-lg px-2 p-1 rounded-full font-medium hover:scale-105'>
                {nameSplit[0].charAt(0).toUpperCase() || 'U'}
                {nameSplit.length > 1 && nameSplit[1].charAt(0).toUpperCase()}
              </h1>
            </div>
          ) : (
            <button
              className='uppercase bg-secondary px-4 py-2 rounded-xl text-white'
              onClick={() => dispatch(setAuthModalOpen(true))}
            >
              Sign In
            </button>
          )}
        </div>
        <div className='hidden sm:inline-flex cursor-pointer'>
          {session?.user ? (
            <button
              onClick={toggleUserMenu}
              className='bg-secondary text-white text-lg px-2 py-1 rounded-full font-medium hover:scale-105'
            >
              {nameSplit[0].charAt(0).toUpperCase() || 'U'}
              {nameSplit.length > 1 && nameSplit[1].charAt(0).toUpperCase()}
            </button>
          ) : (
            <button
              className='uppercase bg-secondary px-4 py-2 rounded-xl text-white'
              onClick={() => dispatch(setAuthModalOpen(true))}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Navbar
