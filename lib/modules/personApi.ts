import { BASE_URL } from '../constants'

const personEndpoints = {
  detail: (personId: string) => `person/${personId}/detail`,
  medias: (personId: string) => `person/${personId}/medias`,
}

const personApi = {
  getDetail: async (personId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/${personEndpoints.detail(personId)}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const res = await response.json()
      return { res }
    } catch (err) {
      return { message: 'Failed to fetch the person details!', err }
    }
  },
  medias: async (personId: string) => {
    try {
      const response = await fetch(`${BASE_URL}/api/${personEndpoints.medias(personId)}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const res = await response.json()
      return { res }
    } catch (err) {
      return { message: 'Failed to fetch the person medias!', err }
    }
  },
}

export default personApi
