const baseUrl = process.env.TMDB_BASE_URL
const key = process.env.TMDB_KEY

const getUrl = (
  endpoint: string,
  params?: Record<string, string | number | undefined> | undefined,
) => {
  const qs = new URLSearchParams()

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        qs.set(key, String(value))
      }
    })
  }

  const url = `${baseUrl}${endpoint}?api_key=${key}&${qs}`
  return url
}

const TMBDConfig = { getUrl }

export default TMBDConfig
