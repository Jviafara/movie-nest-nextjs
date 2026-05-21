import { SchemaOptions } from 'mongoose'

export const modelOptions: SchemaOptions = {
  toJSON: {
    virtuals: true,
    transform: (_doc, ret) => {
      const { _id, ...rest } = ret
      return ret
    },
  },
  toObject: {
    virtuals: true,
    transform: (_doc, ret) => {
      const { _id, ...rest } = ret
      return ret
    },
  },
  versionKey: false,
  timestamps: true,
}

export default modelOptions
