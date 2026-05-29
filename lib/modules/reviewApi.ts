import { BASE_URL } from '../constants'
import { ReviewParams } from '../types'

const ReviewsEndpoints = {
  list: '/reviews',
  add: '/reviews',
  remove: (reviewId: string) => `/reviews/${reviewId}`,
}

const reviewApi = {
  getList: async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/${ReviewsEndpoints.list}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const res = await response.json()
      return { res }
    } catch (err) {
      return { message: 'Failed to fetch the review!', err }
    }
  },
  add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, content }: ReviewParams) => {
    const body = { mediaId, mediaType, mediaTitle, mediaPoster, content }
    try {
      const response = await fetch(`${BASE_URL}/api/${ReviewsEndpoints.add}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const res = await response.json()
      return { res }
    } catch (err) {
      return { message: 'Failed to Create the review!', err }
    }
  },
  remove: async (reviewId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/${ReviewsEndpoints.remove(reviewId)}`, {
        method: 'DELETE',
      })

      const res = await response.json()
      return { res }
    } catch (err) {
      return { message: 'Failed to delete the review!', err }
    }
  },
}

export default reviewApi
