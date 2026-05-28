import tmdbConfigs from '@/lib/configs/tmbd.configs'
import { CastMember } from '@/lib/types'
import Link from 'next/link'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

interface CastSlideProps {
  cast: CastMember[]
}
const CastSlide = ({ cast }: CastSlideProps) => {
  return (
    <div className='flex w-full'>
      <Swiper
        spaceBetween={10}
        grabCursor={true}
        breakpoints={{
          0: {
            slidesPerView: 3,
          },
          640: {
            slidesPerView: 4,
          },
          768: {
            slidesPerView: 5,
          },
          1024: {
            slidesPerView: 6,
          },
        }}
      >
        {cast.map((actor, index) => (
          <SwiperSlide
            key={index}
            className=' w-[50%] sm:w-[35%] md:w-[25%] lg:w-[20.5%]'
          >
            <Link href={`/person/${actor.id}`}>
              <div
                style={{
                  backgroundImage: `url(${tmdbConfigs.posterPath(actor.profile_path || '')})`,
                }}
                className='pt-[120%] bg-cover bg-top bg-base-300'
              />
              <div className='w-full h-max absolute bottom-0 p-2.5 bg-black/60'>
                <h1 className='text-white font-semibold truncate'>{actor.name}</h1>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default CastSlide
