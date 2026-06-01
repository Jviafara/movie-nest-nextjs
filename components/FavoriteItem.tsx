import { useAppDispatch } from '@/lib/hooks/redux.hooks'
import favoriteApi from '@/lib/modules/favoriteApi'
import { Media } from '@/lib/types'
import { useState } from 'react'
import MediaItem from './MediaItem'
import { removeFavorite } from '@/lib/redux/features/favoriteSlice'
import { toast } from 'react-toastify'
import { Trash2 } from 'lucide-react'

interface FavoriteItemsProps {
  media: Media
  onRemoved: (mediaId: string) => void
}

const FavoriteItem = ({ media, onRemoved }: FavoriteItemsProps) => {
  const dispatch = useAppDispatch()
  const [onRequest, setOnRequest] = useState(false)

  const onRemove = async () => {
    if (onRequest) return
    setOnRequest(true)
    const { res, message } = await favoriteApi.remove(media.id.toString())

    setOnRequest(false)
    if (message) toast.error(message)
    if (res.status >= 400) {
      toast.error(res.message)
    } else if (res) {
      toast.success('Removed Succesfully')
      dispatch(removeFavorite({ mediaId: media.id.toString() }))
      onRemoved(media.id.toString())
    }
  }
  return (
    <div>
      <MediaItem
        media={media}
        mediaType={media.mediaType || ''}
      />
      {onRequest ? (
        <button className='flex items-center mt-3 gap-2 w-full p-2 bg-secondary text-white uppercase font-semibold  rounded-md'>
          <span className='loading loading-spinner text-white'></span>
          <h1>loading</h1>
        </button>
      ) : (
        <button
          onClick={onRemove}
          className='w-full mt-3 flex gap-2 justify-center items-center p-2 bg-secondary text-white uppercase font-semibold text-sm rounded-md'
        >
          <Trash2 size={16} />
          <h1>Remove</h1>
        </button>
      )}
    </div>
  )
}

export default FavoriteItem
