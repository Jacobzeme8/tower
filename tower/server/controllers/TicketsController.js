import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService";

export class TicketsController extends BaseController{

  constructor(){
    super('/api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTicket)
      .delete('/:ticketId', this.deleteTicket)
      
  }
  async deleteTicket(req, res, next) {
    try {
      const ticketId = req.params.ticketId
      const accoundId = req.userInfo.id
      const ticket = await ticketsService.deleteTicket(ticketId, accoundId)
      return res.send(ticket)
    } catch (error) {
      next(error)
    }
  }
  
  async createTicket(req, res, next) {
    try {
      const ticketData = req.body
      ticketData.accountId = req.userInfo.id
      const ticket = await ticketsService.createTicket(ticketData)
      res.send(ticket)
    } catch (error) {
      next(error)
    }
  }

}