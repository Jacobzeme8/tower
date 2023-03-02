import { AppState } from "../AppState"
import { Event } from "../models/Event"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventsService{

  async getAllEvents(){
    const res = await api.get('api/events')
    AppState.events = res.data.map(e => new Event(e))
    logger.log(AppState.events)
  }

  async getEventById(eventId){
    const res = await api.get(`api/events/${eventId}`)
    logger.log(res.data)
    AppState.activeEvent = new Event(res.data)
    AppState.activeProfile = res.data.creator
  }

}

export const eventsService = new EventsService()