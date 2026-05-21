import { TMBD_PARAMS } from '../types.js'
import TMBDConfig from './tmdbConfig'

const tmdbEndpoints = {
  mediaList: ({ mediaType, mediaCategory, page }: TMBD_PARAMS) =>
    TMBDConfig.getUrl(`${mediaType}/${mediaCategory}`, { page }),

  mediaDetail: ({ mediaType, mediaId }: TMBD_PARAMS) => TMBDConfig.getUrl(`${mediaType}/${mediaId}`),

  mediaGenres: ({ mediaType }: TMBD_PARAMS) => TMBDConfig.getUrl(`genre/${mediaType}/list`),

  mediaCredits: ({ mediaType, mediaId }: TMBD_PARAMS) => TMBDConfig.getUrl(`${mediaType}/${mediaId}/credits`),

  mediaVideos: ({ mediaType, mediaId }: TMBD_PARAMS) => TMBDConfig.getUrl(`${mediaType}/${mediaId}/videos`),

  mediaRecommended: ({ mediaType, mediaId }: TMBD_PARAMS) =>
    TMBDConfig.getUrl(`${mediaType}/${mediaId}/recommendations`),

  mediaImages: ({ mediaType, mediaId }: TMBD_PARAMS) => TMBDConfig.getUrl(`${mediaType}/${mediaId}/images`),

  mediaSearch: ({ mediaType, query, page }: TMBD_PARAMS) => TMBDConfig.getUrl(`search/${mediaType}`, { query, page }),

  personDetail: ({ personId }: TMBD_PARAMS) => TMBDConfig.getUrl(`person/${personId}`),
  personMedias: ({ personId }: TMBD_PARAMS) => TMBDConfig.getUrl(`person/${personId}/combined_credits`),
}

export default tmdbEndpoints
