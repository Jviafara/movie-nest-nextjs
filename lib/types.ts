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

export interface Genre {
  id: number
  name: string
}
