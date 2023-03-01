import { Schema } from "mongoose";


export const TicketSchema = new Schema({
eventId: {type: Schema.Types.ObjectId, required: true, ref: 'Event'},
accountId: {type: Schema.Types.ObjectId, required: true, ref: 'Account'}
},
{timestamps: true, toJSON: { virtuals: true }})

TicketSchema.virtual('profile',{
  ref: 'Account',
  localField: 'accountId',
  foreignField: '_id',
  justOne: true
})

TicketSchema.virtual('event', {
  ref: 'Event',
  localField: 'eventId',
  foreignField: '_id',
  justOne: true
})
