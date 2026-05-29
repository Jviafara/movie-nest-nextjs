import { auth } from '@/lib/auth/auth'
import Review from '@/lib/models/review'
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
    const reviews = await Review.find({
      user: session?.user.id,
    }).sort('-createdAt')
    return responseHandler.ok(reviews)
  } catch {
    return responseHandler.error()
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    })
    if (!session?.user) {
      return responseHandler.unauthorize()
    }
    await connectDB()
    const data = await req.json()
    console.log(data)
    const review = await Review.create({
      user: session.user.id,
      ...data,
    })

    return responseHandler.created({ ...data, _id: review._id })
  } catch (err) {
    console.error(err)
    return responseHandler.error()
  }
}
