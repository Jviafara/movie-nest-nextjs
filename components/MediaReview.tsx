'use client'

import reviewApi from '@/lib/modules/reviewApi'
import { Media, Review } from '@/lib/types'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import TextAvatar from './TextAvatar'
import LoadingButton from './LoadingButton'
import ReviewItem from './ReviewItem'
import Container from './Container'
import { useSession } from '@/lib/auth/auth-client'
import { motion } from 'framer-motion'
import { div } from 'motion/react-client'

interface IMediaReview {
  reviews: Review[]
  media: Media
  mediaType: 'movie' | 'tv'
}

const MediaReview = ({ reviews, media, mediaType }: IMediaReview) => {
  const { data: session } = useSession()
  const [listReviews, setListReviews] = useState<Review[]>([])
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([])
  const [page, setPage] = useState(1)
  const [onRequest, setOnRequest] = useState(false)
  const [content, setContent] = useState('')
  const [reviewCount, setReviewCount] = useState(0)
  const [reviewsLoading, setReviewsLoading] = useState(false)

  const skip = 4

  useEffect(() => {
    const setInitialReviews = () => {
      setListReviews([...reviews])
      setFilteredReviews([...reviews].splice(0, skip))
      setReviewCount(reviews.length)
    }
    setInitialReviews()
  }, [reviews])

  const onAddReview = async () => {
    if (onRequest) return
    setOnRequest(true)

    const body = {
      content,
      mediaId: media.id,
      mediaType,
      mediaTitle: media.title || media.name || '',
      mediaPoster: media.poster_path || '',
    }

    const { res, message } = await reviewApi.add(body)

    setOnRequest(false)

    if (message) toast.error(message)
    if (res) {
      toast.success('Post review success')

      const newReview = { ...res, user: session?.user }
      setListReviews([newReview, ...listReviews])
      setFilteredReviews([newReview, ...filteredReviews])
      setReviewCount(reviewCount + 1)
      setContent('')
    }
  }

  const onLoadMore = () => {
    setReviewsLoading(true)
    setFilteredReviews([...filteredReviews, ...[...listReviews].splice(page * skip, skip)])
    setPage(page + 1)
    setReviewsLoading(false)
  }

  const onRemoved = (id: string) => {
    if (listReviews.findIndex(e => e._id === id) !== -1) {
      const newListReviews = [...listReviews].filter(e => e._id !== id)
      setListReviews(newListReviews)
      setFilteredReviews([...newListReviews].splice(0, page * skip))
    } else {
      setFilteredReviews([...filteredReviews].filter(e => e._id !== id))
    }

    setReviewCount(reviewCount - 1)

    toast.success('Remove review success')
  }

  return (
    <>
      {mediaType === 'movie' ? (
        <div>
          <Container header={`Reviews (${reviewCount})`}>
            <div className='flex flex-col gap-4 mb-2'>
              {filteredReviews.map((item, index) =>
                item.user ? (
                  <div key={index}>
                    <ReviewItem
                      review={item}
                      onRemoved={onRemoved}
                    />
                    <hr className='text-primary' />
                  </div>
                ) : null,
              )}
              {filteredReviews.length < listReviews.length && (
                <LoadingButton
                  loading={reviewsLoading}
                  onLoadMore={onLoadMore}
                />
              )}
            </div>
            {session?.user && (
              <>
                {filteredReviews.length <= 0 && <hr className='text-primary' />}
                <div className='flex gap-2 items-center'>
                  <TextAvatar text={session.user.name} />
                  <div className='flex flex-col gap-2 grow'>
                    <h1 className='font-bold text-primary '>{session.user.name}</h1>
                    <textarea
                      value={content}
                      placeholder='Write your review'
                      rows={2}
                      maxLength={400}
                      onChange={e => setContent(e.target.value)}
                      className='border border-primary rounded-lg py-2 px-4 w-full bg-base-100 text-primary placeholder:text-primary/50'
                    />
                    {onRequest ? (
                      <div className='w-1/5 md:px-4 py-2 flex justify-center items-center'>
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
                      </div>
                    ) : (
                      <button
                        onClick={onAddReview}
                        className='w-1/5 md:px-4 py-2 bg-secondary text-center text-white uppercase rounded-md'
                      >
                        post
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </Container>
        </div>
      ) : null}
    </>
  )
}

export default MediaReview
