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
