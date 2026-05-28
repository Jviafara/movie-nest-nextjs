import { Heart } from 'lucide-react'

interface FavoriteButtonProps {
  loading: boolean
  onFavoriteClick: () => void
  isFavorite: boolean
}

const FavoriteButton = ({ loading, onFavoriteClick, isFavorite }: FavoriteButtonProps) => {
  return (
    <div>
      {loading ? (
        <button>
          <span className='loading loading-spinner text-secondary'></span>
        </button>
      ) : (
        <div className='cursor-pointer'>
          {isFavorite ? (
            <button
              onClick={onFavoriteClick}
              className='cursor-pointer'
            >
              <Heart
                color='red'
                size={32}
              />
            </button>
          ) : (
            <button
              onClick={onFavoriteClick}
              className='cursor-pointer'
            >
              <Heart
                className='text-primary'
                size={32}
              />
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default FavoriteButton
