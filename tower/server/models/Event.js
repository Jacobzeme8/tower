import { Schema } from "mongoose";


export const EventSchema = new Schema({
  name: { type: String, required: true },
  description:{ type: String, required: true },
  coverImg: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  startDate: { type: Date, required: true },
  isCanceled: {type: Boolean, default: false},
  type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], default: 'convention'},
  creatorId: { type: Schema.Types.ObjectId, ref: 'Account', required: true }
},
  {timestamps: true, toJSON: { virtuals: true }},
  
  )

  EventSchema.virtual('creator', {
    ref: 'Account',
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true
  })