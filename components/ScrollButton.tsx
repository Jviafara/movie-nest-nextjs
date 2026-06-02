'use client'
import { ArrowDown, ArrowUp, SquareArrowDown, SquareArrowUp } from 'lucide-react'

const ScrollButton = () => {
  return (
    <div className='fixed bottom-20 right-2 md:right-10 z-10'>
      <button
        type='button'
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }
        className='hidden md:inline-flex cursor-pointer '
      >
        <SquareArrowUp
          color='red'
          size={24}
        />
      </button>
      <button
        type='button'
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }
        className='md:hidden inline-flex cursor-pointer '
      >
        <SquareArrowDown
          color='red'
          size={24}
        />
      </button>
    </div>
  )
}

export default ScrollButton
