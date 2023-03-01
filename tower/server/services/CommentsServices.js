import { dbContext } from "../db/DbContext"

class CommentsServices{
  async getEventComments(eventId) {
    const comments = await dbContext.Comment.find({eventId}).populate('creator')
    return comments
  }
  async getComments(commentData) {
    const comment = await dbContext.Comment.create(commentData)
    await comment.populate('creator')
    return comment
  }

}

export const commentsServices = new CommentsServices()