import { useSession } from '@/lib/auth/auth-client'
import reviewApi from '@/lib/modules/reviewApi'
import { Review } from '@/lib/types'
import { useState } from 'react'
import { toast } from 'react-toastify'
import TextAvatar from './TextAvatar'
import dayjs from 'dayjs'
import RemoveButton from './RemoveButton'

interface IReviewItem {
  review: Review
  onRemoved: (id: string) => void
}

const ReviewItem = ({ review, onRemoved }: IReviewItem) => {
  const { data: session } = useSession()
  const [onRequest, setOnRequest] = useState(false)

  const onRemove = async () => {
    if (onRequest) return
    setOnRequest(true)
    const { res, message } = await reviewApi.remove(review._id)

    if (message) toast.error(message)
    if (res) onRemoved(review._id)

    setOnRequest(false)
  }

  return (
    <div className={`p-2 relative ${onRequest ? 'opacity-60' : 'opacity-100'} `}>
      <div className='flex gap-4 items-center'>
        {/* avatar */}
        <TextAvatar text={review.user.name} />
        {/* avatar */}

        <div className='flex flex-col shrink-0 items-center justify-center gap-1 text-primary'>
          <h1 className='font-bold'>{review.user.name}</h1>
          <div>
            <p>{dayjs(review.createdAt).format('DD-MM-YYYY')}</p>
          </div>
        </div>
        <div className='flex justify-between items-center grow'>
          <p className='text-justify text-primary'>{review.content}</p>

          {session?.user && (session.user.id === review.user._id || session.user.id === review.user.id) && (
            <RemoveButton
              loading={onRequest}
              onRemove={onRemove}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default ReviewItem
