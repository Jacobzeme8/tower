import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class CommentsService{

  async getEventComments(eventId){
    const res = await api.get(`/api/events/${eventId}/comments`)
    AppState.comments = res.data
  }

  async postComment(commentData, eventId){
    commentData.eventId = eventId
    const res = await api.post(`api/comments`, commentData)
    logger.log(res.data)
  }

}

export const commentsService = new CommentsService()