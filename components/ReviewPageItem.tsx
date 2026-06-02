import tmdbConfigs from '@/lib/configs/tmbd.configs'
import reviewApi from '@/lib/modules/reviewApi'
import { Review } from '@/lib/types'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify'
import RemoveButton from './RemoveButton'
import dayjs from 'dayjs'

interface ReviewsPageProps {
  review: Review
  onRemoved: (reviewId: string) => void
}
const ReviewPageItem = ({ review, onRemoved }: ReviewsPageProps) => {
  const [onRequest, setOnRequest] = useState(false)

  const onRemove = async () => {
    if (onRequest) return
    setOnRequest(true)
    const { res, message } = await reviewApi.remove(review._id)
    setOnRequest(false)
    if (message) toast.error(message)

    if (res.status >= 400) {
      toast.error(res.message)
    } else if (res) {
      toast.success('Removed Succesfully')
      onRemoved(review._id)
    }
  }
  return (
    <div className={`relative w-full flex flex-col md:flex-row gap-2 md:gap-0 justify-between ${onRequest ? 'opacity-60' : 'opacity-100'}`}>
      <div className='w-0 md:w-[15%]'>
        <Link href={`/${review.mediaType}/${review.mediaId}`}>
          <div
            style={{
              backgroundImage: `url(${tmdbConfigs.posterPath(review.mediaPoster)})`,
            }}
            className='pt-[160%] bg-cover bg-top bg-base-300'
          />
        </Link>
      </div>
      <div className='w-full md:-[80%] md:px-8 flex flex-col gap-2'>
        <div className='flex flex-col md:flex-row items-center  md:justify-betweenmd:gap-2'>
          <div className='flex flex-col md:flex-row items-center justify-baseline gap-2 md:grow'>
            <Link href={`/${review.mediaType}/${review.mediaId}`}>
              <h1 className='line-clamp-1 text-left text-lg font-semibold text-primary'>{review.mediaTitle}</h1>
            </Link>
            <h1 className='text-primary/70'>( {dayjs(review.createdAt).format('DD/MM/YYYY HH:mm')} )</h1>
          </div>
          <div className=' py-1 px-2 mx-4  flex items-center'>
            <RemoveButton
              loading={onRequest}
              onRemove={onRemove}
            />
          </div>
        </div>
        <h1 className='line-clamp-4 text-primary text-center md:text-left'>{review.content}</h1>
      </div>
    </div>
  )
}

export default ReviewPageItem
