'use client'

import mediaApi from '@/lib/modules/mediaApi'
import { TMBD_PARAMS } from '@/lib/types'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { SwiperSlide } from 'swiper/react'
import AutoSwiper from './AutoSwiper'
import MediaItem from './MediaItem'

const MediaSlide = ({ mediaType, mediaCategory }: TMBD_PARAMS) => {
  const [medias, setMedias] = useState([])

  useEffect(() => {
    const getMedias = async () => {
      const { res, message } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: '1',
      })

      if (res) setMedias(res.results)
      if (message) toast.error(message)
    }
    getMedias()
  }, [mediaType, mediaCategory])

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
        1024: {
          slidesPerView: 5,
        },
      }}
    >
      {medias.map((media, index) => (
        <SwiperSlide key={index}>
          <MediaItem
            media={media}
            mediaType={mediaType || ''}
          />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  )
}

export default MediaSlide
