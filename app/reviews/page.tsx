'use client'

import Container from '@/components/Container'
import LoadingButton from '@/components/LoadingButton'
import ReviewItem from '@/components/ReviewItem'
import ReviewPageItem from '@/components/ReviewPageItem'
import reviewApi from '@/lib/modules/reviewApi'
import { setGlobalLoading } from '@/lib/redux/features/globalLoadingSlice'
import { Review } from '@/lib/types'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [filteredReviews, setFilteredReviewss] = useState<Review[]>([])
  const [page, setpage] = useState(1)
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const skip = 4

  useEffect(() => {
    const getReviews = async () => {
      dispatch(setGlobalLoading(true))
      const { res, message } = await reviewApi.getList()
      if (res) dispatch(setGlobalLoading(false))
      if (message) toast.error(message)
      if (res.status >= 400) {
        toast.error(res.message)
      } else if (res) {
        setCount(res.length)
        setReviews([...res])
        setFilteredReviewss([...res].splice(0, skip))
      }
    }
    getReviews()
  }, [dispatch])

  const onLoadMore = () => {
    setLoading(true)
    setFilteredReviewss([...filteredReviews, ...reviews.splice(page * skip, skip)])
    setpage(page + 1)
    setLoading(false)
  }

  const onRemoved = (id: string) => {
    const newReviews = [...reviews].filter(e => e._id !== id)
    setReviews(newReviews)
    setFilteredReviewss([...newReviews].splice(0, page * skip))
    setCount(count - 1)
  }

  return (
    <div className='w-full min-h-screen max-w-341.5 mx-auto p-12 my-10 flex flex-col gap-8'>
      <div className=''>
        <Container header={`Your Reviews (${count})`}>
          <div className='flex flex-col gap-2'>
            {filteredReviews.map((item, index) => (
              <div key={index}>
                <ReviewPageItem
                  review={item}
                  onRemoved={onRemoved}
                />
                <hr className='my-2 border-primary' />
              </div>
            ))}
          </div>
        </Container>
      </div>
      {filteredReviews.length < reviews.length && (
        <LoadingButton
          loading={loading}
          onLoadMore={onLoadMore}
        />
      )}
    </div>
  )
}

export default ReviewsPage
