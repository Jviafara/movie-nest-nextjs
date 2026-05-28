import { Media } from '@/lib/types'
import React from 'react'
import { SwiperSlide } from 'swiper/react'
import AutoSwiper from './AutoSwiper'
import MediaItem from './MediaItem'

interface IMediaGrid {
  medias: Media[]
  mediaType: string
}

const RecommendSlide = ({ medias, mediaType }: IMediaGrid) => {
  return (
    <AutoSwiper
      breakpoints={{
        0: {
          slidesPerView: 2,
        },
        640: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 4,
        },
      }}
    >
      {medias.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem
            media={media}
            mediaType={mediaType}
          />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  )
}
export default RecommendSlide
