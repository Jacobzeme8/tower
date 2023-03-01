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

}

export const eventsService = new EventsService()