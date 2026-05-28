import { Navigation, Pagination } from 'swiper/modules'
import { Swiper } from 'swiper/react'

const NavigationSwiper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='swiper-button'>
      <Swiper
        spaceBetween={10}
        grabCursor={true}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Navigation, Pagination]}
        style={
          {
            '--swiper-navigation-color': '#fff',
            '--swiper-pagination-color': '#fff',
          } as React.CSSProperties
        }
        className='w-full max-h-max px-4 md:px-16 '
      >
        {children}
      </Swiper>
    </div>
  )
}

export default NavigationSwiper
