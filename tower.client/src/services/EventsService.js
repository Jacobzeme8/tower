import { AppState } from "../AppState"
import { Event } from "../models/Event"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import { ticketsService } from "./TicketsService"

class EventsService{

  async getAllEvents(){
    const res = await api.get('api/events')
    AppState.events = res.data.map(e => new Event(e))
    // logger.log(AppState.events)
  }

  async getEventById(eventId){
    const res = await api.get(`api/events/${eventId}`)
    // logger.log(res.data)
    AppState.activeEvent = new Event(res.data)
    AppState.activeProfile = res.data.creator
  }

  async getMyEvents(){
    await this.getAllEvents()
    logger.log('appsate events', AppState.events)
    const myEvents = AppState.events.filter(e => e.creatorId == AppState.account.id)
    logger.log("account", AppState.account)
    logger.log('my events', myEvents)

  }

  async deleteEvent(eventId){
    const res = await api.delete(`api/events/${eventId}`)
    // logger.log(res.data)

  }
  async createEvent(eventData){
    const res = await api.post('api/events', eventData)
    const event = new Event(res.data)
    AppState.events.unshift(event)
    return event.id
  }

}

export const eventsService = new EventsService()