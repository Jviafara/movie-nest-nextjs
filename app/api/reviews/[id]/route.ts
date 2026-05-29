import { auth } from '@/lib/auth/auth'
import Review from '@/lib/models/review'
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
    const { id: reviewId } = await params

    await connectDB()

    const isReview = await Review.findOne({
      _id: reviewId,
    })
    if (!isReview) return responseHandler.notFound()

    await Review.findByIdAndDelete(isReview)

    return responseHandler.ok({ _id: isReview._id })
  } catch (err) {
    console.error(err)
    return responseHandler.error()
  }
}
