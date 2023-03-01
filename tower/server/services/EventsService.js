import { dbContext } from "../db/DbContext"
import { BadRequest, UnAuthorized } from "../utils/Errors"

class EventsService{
  async cancelEvent(eventId, userId) {
    const event = await this.getEventById(eventId)
    if(event.creatorId != userId)
    {throw new BadRequest('You are not authorized to cancel this event!')}
    event.isCanceled = true
    await event.save()
    return event
  }
  async editEvent(edditedEvent, userId, eventId) {
    const foundEvent = await this.getEventById(eventId)
    if(foundEvent.creatorId != userId){
      throw new BadRequest('You are not authorized to edit this event!')
    }

    if(foundEvent.isCanceled == true){
      throw new BadRequest('cannot edit a cancelled event!')
    }
    
    foundEvent.name = edditedEvent.name || foundEvent.name
    foundEvent.description = edditedEvent.description || foundEvent.description
    foundEvent.coverImg = edditedEvent.coverImg || foundEvent.coverImg
    foundEvent.location = edditedEvent.location || foundEvent.location
    foundEvent.capacity = edditedEvent.capacity || foundEvent.capacity
    foundEvent.startDate = edditedEvent.startDate || foundEvent.startDate
    foundEvent.type = edditedEvent.type || foundEvent.type

    await foundEvent.save()

    return foundEvent
  }
  async getEventById(eventId) {
    const event = await dbContext.Event.findById(eventId)
    if(!event){
      throw new BadRequest('Bad Event Id!')
    }
    return event
  }
  async createEvent(eventData) {
    const event = await dbContext.Event.create(eventData)
    event.populate('creator')
    return event
  }
  async getAllEvents() {
    const events = await dbContext.Event.find().populate('creator')
    return events
  }

}

export const eventsService = new EventsService()