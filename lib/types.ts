import mongoose from 'mongoose'

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
  backdrops: MediaImage[]
  logos: MediaImage[]
  posters: MediaImage[]
}
export interface mediaRecommended {
  page: string
  results: []
  total_pages: number
  total_results: number
}

export interface MediaImage {
  aspect_ratio: number
  file_path: string
  height: number
  iso_639_1: string | null
  iso_3166_1: string | null
  vote_average: number
  vote_count: number
  width: number
}

interface Credits {
  id: number
  cast: []
  crew: []
}

export interface Media {
  adult: boolean
  backdrop_path: string | null
  genre_ids: number[]
  id: number
  mediaId?: string
  original_language: string
  original_title?: string
  mediaTitle?: string
  original_name?: string
  overview: string
  popularity: number
  poster_path: string | null
  release_date?: string
  first_air_date?: string
  title?: string
  name?: string
  video?: boolean
  videos?: { results?: IMediaVideo[] }
  vote_average: number
  mediaRate?: number
  vote_count: number
  media_type?: 'movie' | 'tv' | 'person'
  mediaType?: 'movie' | 'tv' | 'person'
  profile_path: string | null
  mediaPoster?: string
  images?: mediaImages
  recommend?: mediaRecommended
  credits?: Credits
  reviews?: Review[]
}

export interface Genre {
  id: number
  name: string
}

export interface Favorite {
  _id?: string
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

export interface IMediaVideo {
  id: string
  iso_639_1: string
  iso_3166_1: string
  key: string
  name: string
  official: true
  published_at: string
  site: string
  size: number
  type: string
}

export interface CastMember {
  adult: boolean
  cast_id: number
  character: string
  credit_id: string
  gender: number
  id: number
  known_for_department: string
  name: string
  order: number
  original_name: string
  popularity: number
  profile_path: string | null
}
export interface User {
  _id: string
  id?: string
  name: string
  email: string
  emailVerified: boolean
  image: string
}
export interface Review {
  _id: string
  user: User
  content: string
  mediaType: 'movie' | 'tv'
  mediaId: number
  mediaTitle: string
  mediaPoster: string
  createdAt: Date
  updatedAt: Date
}

export interface ReviewParams {
  mediaId: number
  mediaType: 'movie' | 'tv'
  mediaTitle: string
  mediaPoster: string
  content: string
}

export interface PersonDetails {
  adult: boolean
  also_known_as: string[]
  biography: string
  birthday: string
  deathday: string | null
  gender: number
  homepage: string | null
  id: number
  imdb_id: string
  known_for_department: string
  name: string
  place_of_birth: string
  popularity: number
  profile_path: string | null
}
