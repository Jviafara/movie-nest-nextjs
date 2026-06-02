import React from 'react'
import MediaItem from './MediaItem'
import { Media } from '@/lib/types'

interface IMediaGrid {
  medias: Media[]
  mediaType: string
}

const MediaGrid = ({ medias, mediaType }: IMediaGrid) => {
  return (
    <div className='grid grid-flow-row grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
      {medias?.map((media, index) => (
        <MediaItem
          key={index}
          media={media}
          mediaType={mediaType}
        />
      ))}
    </div>
  )
}

export default MediaGrid
