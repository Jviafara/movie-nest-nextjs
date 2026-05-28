import { auth } from '@/lib/auth/auth'
import Favorite from '@/lib/models/favorite'
import connectDB from '@/lib/mongodb'
import responseHandler from '@/lib/responseHandler'
import { NextRequest } from 'next/server'

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    })
    if (!session?.user) {
      return responseHandler.unauthorize()
    }
    const { id: favoriteId } = await params

    await connectDB()

    const isFavorite = await Favorite.findOne({
      _id: favoriteId,
    })
    if (!isFavorite) return responseHandler.notFound()

    await Favorite.findByIdAndDelete(favoriteId)

    return responseHandler.ok({ _id: isFavorite._id })
  } catch (err) {
    console.error(err)
    return responseHandler.error()
  }
}
