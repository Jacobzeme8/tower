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
    AppState.comments.unshift(res.data)
  }

  async deleteComment(commentId){
    const res = await api.delete(`api/comments/${commentId}`)
    logger.log(res.data)
    let index = AppState.comments.findIndex(c => c.id == commentId)
    AppState.comments.splice(index, 1)
  }

}

export const commentsService = new CommentsService()