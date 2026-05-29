import mongoose, { Schema } from 'mongoose'

enum MediaTypeEnum {
  tv = 'tv',
  movie = ' movie',
}
interface IReviewModel {
  user: mongoose.Types.ObjectId
  content: string
  mediaType: MediaTypeEnum
  mediaId: string
  mediaTitle: string
  mediaPoster: string
}

const reviewSchema = new Schema<IReviewModel>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    mediaType: { type: String, enum: ['tv', 'movie'], required: true },
    mediaId: { type: String, required: true },
    mediaTitle: { type: String, required: true },
    mediaPoster: { type: String, required: true },
  },
  { timestamps: true },
)

const Review = mongoose.models.Review || mongoose.model<IReviewModel>('Review', reviewSchema)
export default Review
