import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsServices } from "../services/CommentsServices";
import { eventsService } from "../services/EventsService";
import { ticketsService } from "../services/TicketsService";
import BaseController from "../utils/BaseController";

export class EventsController extends BaseController{

  constructor(){
    super('/api/events')
    this.router
    .get('', this.getAllEvents)
    .get('/:eventId', this.getEventById)
    .get('/:eventId/comments', this.getEventComments)
    .use(Auth0Provider.getAuthorizedUserInfo)
    .get('/:eventId/tickets', this.getEventTickets)
    .post('', this.createEvent)
    .put('/:eventId', this.editEvent)
    .delete('/:eventId', this.cancelEvent)

  }

    async getEventComments(req, res, next){
      try {
        const eventId = req.params.eventId
        const comments = await commentsServices.getEventComments(eventId)
        return res.send(comments)
      } catch (error) {
        next(error)
      }
    }

  async getEventTickets(req, res, next) {
    try {
      const eventId = req.params.eventId
      const tickets = await ticketsService.getEventTickets(eventId)
      return res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
  async cancelEvent(req, res, next) {
    try {
      const eventId = req.params.eventId
      const userId = req.userInfo.id
      const event = await eventsService.cancelEvent(eventId, userId)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async editEvent(req, res, next) {
    try {
      const edditedEvent = req.body
      const userId = req.userInfo.id
      const eventId = req.params.eventId
      const event = await eventsService.editEvent(edditedEvent, userId, eventId)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }
  async getEventById(req, res, next) {
    try {
      const eventId = req.params.eventId
      const event = await eventsService.getEventById(eventId)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }

  async getAllEvents(req, res, next){
    try {
      const events = await eventsService.getAllEvents()
      res.send(events)
    } catch (error) {
      next(error)
    }
  }

  async createEvent(req, res, next){
    try {
      const eventData = req.body
      eventData.creatorId = req.userInfo.id
      const event = await eventsService.createEvent(eventData)
      res.send(event)
    } catch (error) {
      next(error)
    }
  }

}