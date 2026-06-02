import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux.hooks'
import favoriteApi from '@/lib/modules/favoriteApi'
import { Favorite, Media } from '@/lib/types'
import { useState } from 'react'
import MediaItem from './MediaItem'
import { removeFavorite } from '@/lib/redux/features/favoriteSlice'
import { toast } from 'react-toastify'
import { Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface FavoriteItemsProps {
  media: Media
  onRemoved: (mediaId: string) => void
}

const FavoriteItem = ({ media, onRemoved }: FavoriteItemsProps) => {
  const dispatch = useAppDispatch()
  const [onRequest, setOnRequest] = useState(false)

  const { favoriteList } = useAppSelector(state => state.favoriteList)

  const onRemove = async () => {
    if (onRequest) return
    setOnRequest(true)
    if (media) {
      const favorite = favoriteList.find((e: Favorite) => e.mediaId.toString() === media.mediaId)
      const { res, message } = await favoriteApi.remove(favorite?._id || '')
      setOnRequest(false)
      if (message) toast.error(message)
      if (res.status >= 400) {
        toast.error(res.message)
      } else if (res) {
        dispatch(removeFavorite(res))
        toast.success('Removed Succesfully')
        onRemoved(media.mediaId || '')
      }
    }
  }
  return (
    <div>
      <MediaItem
        media={media}
        mediaType={media.mediaType || ''}
      />
      {onRequest ? (
        <div className='w-full mt-3 flex gap-2 justify-center items-center p-2 bg-secondary text-white uppercase font-semibold text-sm rounded-md'>
          <motion.div
            style={{
              width: '25px',
              height: '25px',
              border: '1px solid transparent',
              borderTop: '2px solid var(--primary)',
              borderLeft: '2px solid var(--primary)',
              borderRadius: '50%',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className='w-full'
          />
        </div>
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
