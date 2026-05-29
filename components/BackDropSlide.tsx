import { SwiperSlide } from 'swiper/react'
import NavigationSwiper from './NavigationSwiper'
import tmdbConfigs from '@/lib/configs/tmbd.configs'
import { MediaImage } from '@/lib/types'

interface BackDropSlideProps {
  backdrops: MediaImage[]
}

const BackDropSlide = ({ backdrops }: BackDropSlideProps) => {
  return (
    <div className='w-full '>
      <NavigationSwiper>
        {[...backdrops].slice(0, 10).map((item, index) => (
          <SwiperSlide
            key={index}
            className='swipper-slide'
          >
            <div
              style={{
                backgroundImage: `url(${tmdbConfigs.backdropPath(item.file_path)})`,
              }}
              className='pt-[60%] bg-cover bg-top bg-base-300'
            />
          </SwiperSlide>
        ))}
      </NavigationSwiper>
    </div>
  )
}

export default BackDropSlide
