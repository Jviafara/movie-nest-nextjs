import tmdbConfigs from '@/lib/configs/tmbd.configs'
import personApi from '@/lib/modules/personApi'
import { Media } from '@/lib/types'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import MediaItem from './MediaItem'
import LoadingButton from './LoadingButton'

const PersonMediaGrid = ({ personId }: { personId: string }) => {
  const [medias, setMedias] = useState<Media[]>([])
  const [filteredMedias, setFilteredMedias] = useState<Media[]>([])
  const [page, setPage] = useState(1)
  const skip = 8

  const getReleaseDate = (media: Media) => {
    const date =
      media.media_type === tmdbConfigs.mediaType.movie ? new Date(media.release_date!) : new Date(media.first_air_date!)
    return date
  }

  useEffect(() => {
    const getMedias = async () => {
      const { res, message } = await personApi.medias(personId)
      if (message) toast.error(message)
      if (res.status >= 400) {
        toast.error(res.message)
      } else if (res) {
        const mediaSorted = [...res.cast].sort(
          (a: Media, b: Media) => getReleaseDate(b).getTime() - getReleaseDate(a).getTime(),
        )
        setMedias(mediaSorted)
        setFilteredMedias(mediaSorted.slice(0, skip))
      }
    }
    getMedias()
  }, [personId])

  const onLoadMore = () => {
    setFilteredMedias([...filteredMedias, ...medias.slice(page * skip, page * skip + skip)])
    setPage(page + 1)
  }

  return (
    <>
      <div className='grid grid-flow-row grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {filteredMedias.map((media, index) => (
          <MediaItem
            key={index}
            media={media}
            mediaType={media.media_type || ''}
          />
        ))}
      </div>
      {filteredMedias.length < medias.length && <LoadingButton onLoadMore={onLoadMore} />}
    </>
  )
}

export default PersonMediaGrid
