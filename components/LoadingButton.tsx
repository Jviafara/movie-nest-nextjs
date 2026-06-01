import { motion } from 'framer-motion'
interface ILoadingButton {
  loading?: boolean
  onLoadMore: () => void
}
const LoadingButton = ({ loading, onLoadMore }: ILoadingButton) => {
  return (
    <div className='mx-auto'>
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
        <button
          onClick={onLoadMore}
          className='px-4 py-2 bg-secondary text-white uppercase font-semibold text-lg rounded-md'
        >
          load more
        </button>
      )}
    </div>
  )
}

export default LoadingButton
