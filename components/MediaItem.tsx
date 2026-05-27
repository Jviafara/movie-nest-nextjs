import tmdbConfigs from '@/lib/configs/tmbd.configs'
import { ICheckFavorite, Media } from '@/lib/types'
import { Heart, Play } from 'lucide-react'
import Link from 'next/link'
import CircularRate from './CircularRate'
import { useAppSelector } from '@/lib/hooks/redux.hooks'

interface IMediaSlide {
  media: Media
  mediaType: string
}

const MediaItem = ({ media, mediaType }: IMediaSlide) => {
  const title = media.title || media.name || media.original_title || media.original_name || 'Untitled'
  const posterPath =
    media.poster_path || media.backdrop_path || media.profile_path
      ? tmdbConfigs.posterPath(media.poster_path || media.backdrop_path || media.profile_path || '')
      : ''
  const releaseDate =
    mediaType === tmdbConfigs.mediaType.movie
      ? (media.release_date?.split('-')[0] ?? '')
      : (media.first_air_date?.split('-')[0] ?? '')
  const rate = media.vote_average
  const { favoriteList } = useAppSelector(state => state.favoriteList)

  const chekFavorite = ({ favoriteList, mediaId }: ICheckFavorite) =>
    favoriteList && favoriteList.find(e => e.mediaId.toString() === mediaId.toString()) !== undefined

  return (
    <Link
      href={`/${mediaType}/${media.id}`}
      className='group relative'
    >
      <div
        style={{
          backgroundImage: `url(${posterPath})`,
        }}
        className='pt-[160%] bg-cover bg-top bg-base-300'
      />
      {chekFavorite({
        favoriteList,
        mediaId: media.id.toString(),
      }) && (
        <div className='absolute top-2 right-2 text-secondary'>
          <Heart size={32} />
        </div>
      )}
      {/* Movie or tv Item */}
      {mediaType !== 'people' && (
        <div className='hidden group-hover:inline-flex flex-col gap-2 xl:gap-4 px-4 py-8 justify-end w-full min-h-fit h-full  absolute top-0 left-0 bg-linear-to-t from-base-100'>
          <div className='w-full flex justify-center'>
            <div className='px-8 py-2 rounded-lg bg-secondary'>
              <Play
                color='white'
                size={32}
              />
            </div>
          </div>
          <CircularRate value={rate} />
          <h1 className='font-semibold text-primary text-lg'>{releaseDate}</h1>
          <h1 className='font-bold text-primary text-lg truncate'>{title}</h1>
        </div>
      )}
      {/* Movie or tv Item */}

      {/* People */}
      {mediaType === 'people' && (
        <div className='w-full h-max absolute bottom-0 p-2.5 bg-black/60'>
          <h1 className='text-white font-semibold'>{media.name}</h1>
        </div>
      )}
      {/* People */}
    </Link>
  )
}

export default MediaItem
