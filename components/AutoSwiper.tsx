import React from 'react'
import { Swiper, type SwiperProps } from 'swiper/react'

interface AutoSwiperProps {
  children: React.ReactNode
  slidesPerView?: number | 'auto'
  spaceBetween?: number
  breakpoints?: SwiperProps['breakpoints']
}

const AutoSwiper = ({ children, slidesPerView = 2, spaceBetween = 12, breakpoints }: AutoSwiperProps) => {
  return (
    <div className='flex w-full'>
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        grabCursor={true}
        breakpoints={breakpoints}
        style={{ width: '100%', height: 'max-content' }}
      >
        {children}
      </Swiper>
    </div>
  )
}

export default AutoSwiper
