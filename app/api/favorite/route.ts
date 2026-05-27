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

    await connectDB()
    const favorites = await Favorite.find({
      user: session?.user.id,
    }).sort('-createdAt')
    return responseHandler.ok(favorites)
  } catch {
    return responseHandler.error()
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    })
    if (!session?.user) {
      return responseHandler.unauthorize()
    }
    await connectDB()
    const data = await req.json()
    const isFavorite = await Favorite.findOne({
      user: session.user.id,
      mediaId: data.mediaId,
    })
    if (isFavorite) return responseHandler.ok(isFavorite)

    const favorite = new Favorite({
      ...data,
      user: session.user.id,
    })

    await favorite.save()

    return responseHandler.created(data)
  } catch (err) {
    console.error(err)
    return responseHandler.error()
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    })
    if (!session?.user) {
      return responseHandler.unauthorize()
    }
    const favoriteId = params.id
    await connectDB()

    const isFavorite = await Favorite.findOne({
      _id: favoriteId,
    })
    if (!isFavorite) return responseHandler.notFound()

    await Favorite.findByIdAndDelete(favoriteId)

    return responseHandler.justOk()
  } catch (err) {
    console.error(err)
    return responseHandler.error()
  }
}
