import { Heart } from 'lucide-react'
import { motion } from 'framer-motion'

interface FavoriteButtonProps {
  loading: boolean
  onFavoriteClick: () => void
  isFavorite: boolean
}

const FavoriteButton = ({ loading, onFavoriteClick, isFavorite }: FavoriteButtonProps) => {
  return (
    <div>
      {loading ? (
        <motion.div
          style={{
            width: '25px',
            height: '25px',
            border: '1px solid transparent',
            borderTop: '2px solid var(--secondary)',
            borderLeft: '2px solid var(--secondary)',
            borderRadius: '50%',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
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
