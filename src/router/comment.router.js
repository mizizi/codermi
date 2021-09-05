const koaRouter = require('koa-router')
const { verifyAuth, verifyPermission } = require('../middleware/authMiddleware')
const { create, reply, update, remove,list } = require('../controller/comment.controller')
const router = new koaRouter({ prefix: '/comment' })
// 发表评论
router.post('/', verifyAuth, create)
// 回复评论
router.post('/:commentId/reply', verifyAuth, reply)
// 修改评论
router.patch('/:commentId', verifyAuth, verifyPermission, update)
// 删除评论
router.delete('/:commentId', verifyAuth, verifyPermission, remove)
// 获取评论
router.get('/',list)
module.exports = router