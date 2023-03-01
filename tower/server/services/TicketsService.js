import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"
import { eventsService } from "./EventsService"

class TicketsService{
  async deleteTicket(ticketId, accountId) {
    const ticket = await dbContext.Ticket.findById(ticketId)
    if(!ticket){throw new BadRequest}
    if(ticket.accountId != accountId){
      throw new BadRequest
    }
    const event = await eventsService.getEventById(ticket.eventId)
    event.capacity++
    await event.save()
    const deletedTicket = await dbContext.Ticket.remove(ticket)
    return deletedTicket
  }
  async getEventTickets(eventId) {
    const tickets = await dbContext.Ticket.find({eventId}).populate('event profile')
    return tickets
  }
  async getMyTickets(accountId) {
    const tickets = await dbContext.Ticket.find({accountId}).populate('profile event')
    return tickets
  }
  async createTicket(ticketData) {
    const ticket = await dbContext.Ticket.create(ticketData)
    const eventId = ticketData.eventId
    const event = await eventsService.getEventById(eventId)
    event.capacity--
    await event.save()
    await ticket.populate('profile event')
    
    return ticket
  }

}

export const ticketsService = new TicketsService()