import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsServices } from "../services/CommentsServices";
export class CommentsController extends BaseController{

  constructor(){
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.getComments)
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