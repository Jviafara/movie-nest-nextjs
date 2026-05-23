'use client'

import { signOut, useSession } from '@/lib/auth/auth-client'
import menuConfigs, { IMenuConfig } from '@/lib/configs/menu.configs'
import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux.hooks'
import { setAppState } from '@/lib/redux/features/appStateSlice'
import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface IUserMenu {
  open: boolean
  toggleUserMenu: () => void
}

const UserMenu = ({ open, toggleUserMenu }: IUserMenu) => {
  const { data: session } = useSession()

  const { appState } = useAppSelector(state => state.appState)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const handleClick = (item: IMenuConfig) => {
    dispatch(setAppState(item.state))
    toggleUserMenu()
  }

  const signout = async () => {
    const result = await signOut()
    if (result.data) {
      toggleUserMenu()
      router.push('/')
    } else {
      alert('Error cerrar sesión, Intenta nuevamente.')
    }
  }

  return (
    <>
      {open && (
        <div className='absolute z-50 top-20 right-10 bg-base-300 py-4 px-8 rounded-lg flex flex-col gap-4'>
          <h1 className='text-md font-bold text-primary px-3 py-1 w-full text-center'>
            {session?.user?.name.toUpperCase()}
          </h1>
          <ul className='flex flex-col gap-2 justify-center text-primary text-lg'>
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
    </>
  )
}

export default UserMenu
