import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService{

  async purchaseTicketForEvent(eventId){
    const res = await api.post('api/tickets', {eventId})
    AppState.tickets.unshift(res.data)

  }

  async getTicketsForEvent(eventId){
    const res = await api.get(`api/events/${eventId}/tickets`)
    logger.log(res.data)
    AppState.tickets = res.data
  }

}

export const ticketsService = new TicketsService()