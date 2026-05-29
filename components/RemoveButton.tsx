import { Trash2 } from 'lucide-react'
import { motion } from 'framer-motion'

interface IRemoveButton {
  loading: boolean
  onRemove: () => void
}
const RemoveButton = ({ loading, onRemove }: IRemoveButton) => {
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
        <button
          onClick={onRemove}
          className='cursor-pointer'
        >
          <Trash2
            color='red'
            size={20}
          />
        </button>
      )}
    </div>
  )
}

export default RemoveButton
