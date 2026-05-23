import { BASE_URL } from '../constants'
import { TMBD_PARAMS } from '../types'

const genreEndpoints = {
  list: ({ mediaType }: TMBD_PARAMS) => `${mediaType}/genres`,
}

const genreApi = {
  getList: async ({ mediaType }: TMBD_PARAMS) => {
    try {
      const response = await fetch(
        `${BASE_URL}/api/${genreEndpoints.list({
          mediaType,
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
      return { message: 'Failed to fetch the genre!', err }
    }
  },
}

export default genreApi
