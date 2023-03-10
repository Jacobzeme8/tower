import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsServices } from "../services/CommentsServices";
export class CommentsController extends BaseController{

  constructor(){
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.getComments)
      .delete('/:commentId', this.deleteComment)
  }
  async deleteComment(req, res, next) {
    try {
      const commentId = req.params.commentId
      const userId = req.userInfo.id
      const comment = await commentsServices.deleteComment(commentId, userId)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }
  async getComments(req, res, next) {
    try {
      const commentData = req.body
      commentData.creatorId = req.userInfo.id
      const comment = await commentsServices.getComments(commentData)
      return res.send(comment)
    } catch (error) {
      next(error)
    }
  }

}