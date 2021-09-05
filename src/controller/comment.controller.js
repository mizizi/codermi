const CommentServices = require('../services/comment.services.js')
class CommentController {
    async create(ctx, next) {
        // 拿数据
        const { content, momentId } = ctx.request.body
        const { id } = ctx.user
        console.log(ctx.user);
        const result = await CommentServices.create(content, momentId, id)
        ctx.body = result
    }
    async reply(ctx, next) {
        const { content, momentId } = ctx.request.body
        const { id } = ctx.user
        const { commentId } = ctx.params
        const result = await CommentServices.reply(content, momentId, id, commentId)
        ctx.body = result
    }
    async update(ctx, next) {
        const { commentId } = ctx.params
        const { content } = ctx.request.body
        const result = await CommentServices.update(content, commentId)
        ctx.body = result
    }
    async remove(ctx, next) {
        const { commentId } = ctx.params
        const result = await CommentServices.remove(commentId)
        ctx.body = result
    }
    async list(ctx, next) {
        const { momentId } = ctx.query
        const result = await CommentServices.getCommentsByMomentId(momentId)
        ctx.body = result
    }
}
module.exports = new CommentController()