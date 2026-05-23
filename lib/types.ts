export interface TMBD_PARAMS {
  mediaId?: string
  mediaType?: string
  mediaCategory?: string
  query?: string
  personId?: string
  page?: string
}

export type MediaRoute = {
  params: {
    mediaType?: string
    all: string[]
  }
}

export interface Movie {
  id: number
  title?: string
  name?: string
  overview: string
  backdrop_path?: string
  poster_path?: string
  vote_average?: number
  genre_ids?: number[]
}

export interface Media {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  original_language: string
  original_title?: string
  original_name?: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date?: string
  first_air_date?: string
  title?: string
  name?: string
  video?: boolean
  vote_average: number
  vote_count: number
  media_type?: 'movie' | 'tv' | 'person'
}

export interface Genre {
  id: number
  name: string
}
