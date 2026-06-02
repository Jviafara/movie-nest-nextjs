import TMBDClient from '../TMBDClient'
import { TMBD_PARAMS } from '../types'
import tmdbEndpoints from './tmdbEndpoints'

const TMDBApi = {
  mediaList: async ({ mediaType, mediaCategory, page }: TMBD_PARAMS) =>
    TMBDClient.get(tmdbEndpoints.mediaList({ mediaType, mediaCategory, page })),
  mediaDetail: async ({ mediaType, mediaId }: TMBD_PARAMS) =>
    TMBDClient.get(tmdbEndpoints.mediaDetail({ mediaType, mediaId })),
  mediaGenres: async ({ mediaType }: TMBD_PARAMS) => TMBDClient.get(tmdbEndpoints.mediaGenres({ mediaType })),
  mediaCredits: async ({ mediaType, mediaId }: TMBD_PARAMS) =>
    TMBDClient.get(tmdbEndpoints.mediaCredits({ mediaType, mediaId })),
  mediaVideos: async ({ mediaType, mediaId }: TMBD_PARAMS) =>
    TMBDClient.get(tmdbEndpoints.mediaVideos({ mediaType, mediaId })),
  mediaImages: async ({ mediaType, mediaId }: TMBD_PARAMS) =>
    TMBDClient.get(tmdbEndpoints.mediaImages({ mediaType, mediaId })),
  mediaRecommended: async ({ mediaType, mediaId }: TMBD_PARAMS) =>
    TMBDClient.get(tmdbEndpoints.mediaRecommended({ mediaType, mediaId })),
  mediaSearch: async ({ mediaType, query, page }: TMBD_PARAMS) =>
    TMBDClient.get(tmdbEndpoints.mediaSearch({ mediaType, query, page })),
  personDetail: async ({ personId }: TMBD_PARAMS) => TMBDClient.get(tmdbEndpoints.personDetail({ personId })),
  personMedias: async ({ personId }: TMBD_PARAMS) => TMBDClient.get(tmdbEndpoints.personMedias({ personId })),
}

export default TMDBApi
