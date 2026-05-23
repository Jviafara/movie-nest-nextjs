import { BASE_URL } from '../constants'
import { TMBD_PARAMS } from '../types'

const mediaEndpoints = {
  list: ({ mediaType, mediaCategory, page }: TMBD_PARAMS) => `${mediaType}/${mediaCategory}?page=${page}`,
  detail: ({ mediaType, mediaId }: TMBD_PARAMS) => `${mediaType}/detail/${mediaId}`,
  search: ({ mediaType, query, page }: TMBD_PARAMS) => `${mediaType}/search?query=${query}&page=${page}`,
}

const mediaApi = {
  getList: async ({ mediaType, mediaCategory, page }: TMBD_PARAMS) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/${mediaEndpoints.list({
          mediaType,
          mediaCategory,
          page,
        })}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      const res = await response.json()
      return { res }
    } catch (err) {
      return { message: 'Failed to fetch the media!', err }
    }
  },
  getDetail: async ({ mediaType, mediaId }: TMBD_PARAMS) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/${mediaEndpoints.detail({
          mediaType,
          mediaId,
        })}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      const res = await response.json()
      return { res }
    } catch (err) {
      return { message: 'Failed to fetch the media!', err }
    }
  },
  search: async ({ mediaType, query, page }: TMBD_PARAMS) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/${mediaEndpoints.search({
          mediaType,
          query,
          page,
        })}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      const res = await response.json()
      return { res }
    } catch (err) {
      return { message: 'Failed to fetch the media!', err }
    }
  },
}

export default mediaApi
