import { BASE_URL } from '../constants'
import { FavoriteParams } from '../types'

const favoriteEndpoints = {
  list: 'favorite',
  add: 'favorite',
  remove: (favoriteId: string) => `favorite/${favoriteId}`,
}

const favoriteApi = {
  getList: async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/${favoriteEndpoints.list}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const res = await response.json()
      return { res }
    } catch (err) {
      return { message: 'Failed to fetch the favorite!', err }
    }
  },
  add: async ({ mediaId, mediaType, mediaTitle, mediaPoster, mediaRate }: FavoriteParams) => {
    const body = { mediaId, mediaType, mediaTitle, mediaPoster, mediaRate }
    try {
      const response = await fetch(`${BASE_URL}/api/${favoriteEndpoints.add}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const res = await response.json()
      return { res }
    } catch (err) {
      return { message: 'Failed to Create the favorite!', err }
    }
  },
  remove: async (favoriteId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/${favoriteEndpoints.remove(favoriteId)}`, {
        method: 'DELETE',
      })

      const res = await response.json()
      return { res }
    } catch (err) {
      return { message: 'Failed to delete the favorite!', err }
    }
  },
}

export default favoriteApi
