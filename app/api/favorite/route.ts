import { auth } from '@/lib/auth/auth'
import Favorite from '@/lib/models/favorite'
import connectDB from '@/lib/mongodb'
import responseHandler from '@/lib/responseHandler'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    })
    if (!session?.user) {
      return responseHandler.unauthorize()
    }
    const favorites = await Favorite.find({
      user: session?.user.id,
    }).sort('-createdAt')
    return responseHandler.ok(favorites)
  } catch {
    return responseHandler.error()
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const { userId, data } = await request.json()

    const isFavorite = await Favorite.findOne({
      user: userId,
      mediaId: data.mediaId,
    })
    if (isFavorite) return responseHandler.ok(isFavorite)

    const favorite = new Favorite({
      ...data,
      user: userId,
    })

    await favorite.save()

    return responseHandler.created(data)
  } catch (err) {
    console.log(err)
    return responseHandler.error()
  }
}
