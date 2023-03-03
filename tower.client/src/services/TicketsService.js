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
    // logger.log(res.data)
    AppState.tickets = res.data
  }

  async getTicketsForAccount(){
    const res = await api.get('account/tickets')
    // logger.log(res.data)
    AppState.tickets = res.data
  }

  async deleteTicket(ticketId){
    const res = await api.delete(`api/tickets/${ticketId}`)
    // logger.log(res.data)
    const index = AppState.tickets.findIndex(t => t.id == ticketId)
    AppState.tickets.splice(index, 1)
  }

}

export const ticketsService = new TicketsService()