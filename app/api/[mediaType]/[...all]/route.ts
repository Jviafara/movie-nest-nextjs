import { auth } from '@/lib/auth/auth'
import Favorite from '@/lib/models/favorite'
import Review from '@/lib/models/review'
import { User } from '@/lib/models/user'
import connectDB from '@/lib/mongodb'
import responseHandler from '@/lib/responseHandler'
import TMDBApi from '@/lib/tmdb/tmdbApi'
import { MediaRoute } from '@/lib/types'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest, { params }: MediaRoute) {
  try {
    await connectDB()

    const { mediaType, all } = await params
    const subRoute = all.join('/')

    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('query') || ''
    const page = searchParams.get('page') || ''

    if (all[0] === 'search') {
      const response = await TMDBApi.mediaSearch({
        query,
        page,
        mediaType: mediaType === 'people' ? 'person' : mediaType,
      })

      return responseHandler.ok(response)
    } else if (subRoute === 'genres') {
      const response = await TMDBApi.mediaGenres({ mediaType })

      return responseHandler.ok(response)
    } else if (all[0] === 'detail') {
      const media = await TMDBApi.mediaDetail({ mediaType, mediaId: all[1] })

      media.credits = await TMDBApi.mediaCredits({ mediaType, mediaId: all[1] })

      media.videos = await TMDBApi.mediaVideos({ mediaType, mediaId: all[1] })

      media.recommend = await TMDBApi.mediaRecommended({ mediaType, mediaId: all[1] })

      media.images = await TMDBApi.mediaImages({ mediaType, mediaId: all[1] })

      const session = await auth.api.getSession({
        headers: req.headers,
      })

      if (session?.user) {
        const isFavorite = await Favorite.findOne({
          user: session?.user.id,
          mediaId: media.id,
        })
        media.isFavorite = isFavorite !== null
      }

      const users = await User.find()
      console.log(users)
      // const reviews = await Review.find({ mediaId: media.id }).sort('-createdAt')
      const reviews = await Review.find({ mediaId: media.id }).populate('user').sort('-createdAt')
      console.log(reviews)

      return responseHandler.ok(media)
    } else if (all.length >= 1) {
      const response = await TMDBApi.mediaList({
        mediaType,
        mediaCategory: all[0],
        page,
      })
      return responseHandler.ok(response)
    }
  } catch (error) {
    console.error(error)
    return responseHandler.error()
  }
}
