import { dbContext } from "../db/DbContext"
import { UnAuthorized } from "../utils/Errors"

class CommentsServices{
  async deleteComment(commentId, userId) {
    const comment = await dbContext.Comment.findById(commentId)
    // @ts-ignore
    if(comment.creatorId != userId){
      throw new UnAuthorized('this is not your comment!')
    }
    const deletedComment = await dbContext.Comment.remove(comment)
    return deletedComment
  }
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