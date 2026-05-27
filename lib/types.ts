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

export interface mediaImages {
  id: string
  backdrops: []
  logos: []
  posters: []
}
export interface mediaRecommended {
  page: string
  results: []
  total_pages: number
  total_results: number
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
  mediaRate?: number
  vote_count: number
  media_type?: 'movie' | 'tv' | 'person'
  profile_path: string | null
  images?: mediaImages
  recommend?: mediaRecommended
}

export interface Genre {
  id: number
  name: string
}

export interface Favorite {
  user: string
  mediaType: 'movie' | 'tv'
  mediaId: string
  mediaTitle: string
  mediaPoster: string
  mediaRate: number
}
export interface ICheckFavorite {
  favoriteList: Favorite[]
  mediaId: string
}

export interface FavoriteParams {
  mediaType: 'movie' | 'tv'
  mediaId: number
  mediaTitle: string
  mediaPoster: string
  mediaRate: number
}
