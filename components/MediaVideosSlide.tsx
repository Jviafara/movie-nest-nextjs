'use client'

import tmdbConfigs from '@/lib/configs/tmbd.configs'
import { IMediaVideo } from '@/lib/types'
import { useEffect, useRef } from 'react'
import NavigationSwiper from './NavigationSwiper'
import { SwiperSlide } from 'swiper/react'

interface IVideos {
  videos: IMediaVideo[]
}

const MediaVideo = ({ video }: { video: IMediaVideo }) => {
  const iFrameRef = useRef<HTMLIFrameElement | null>(null)

  useEffect(() => {
    const updateHeight = () => {
      if (iFrameRef.current) {
        const height = (iFrameRef.current.offsetWidth * 9) / 16
        iFrameRef.current.style.height = `${height}px`
      }
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)

    return () => {
      window.removeEventListener('resize', updateHeight)
    }
  }, [])

  return (
    <div className='h-max'>
      <iframe
        key={video.key}
        src={tmdbConfigs.youtubePath(video.key)}
        ref={iFrameRef}
        width='100%'
        title={video.id}
        style={{ border: 0 }}
      ></iframe>
    </div>
  )
}

const MediaVideosSlide = ({ videos }: IVideos) => {
  return (
    <div className='w-full '>
      <NavigationSwiper>
        {videos.map((video, index) => (
          <SwiperSlide key={index}>
            <MediaVideo video={video} />
          </SwiperSlide>
        ))}
      </NavigationSwiper>
    </div>
  )
}

export default MediaVideosSlide
