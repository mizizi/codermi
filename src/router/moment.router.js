const koaRouter = require('koa-router')
const {
    verifyAuth, verifyPermission
} = require('../middleware/authMiddleware')
const {
    create, detail, list, update, remove, addLabels,fileInfo
} = require('../controller/moment.controller.js')
const {
    verifyLabelExists
} = require('../middleware/labelMiddleware')
const router = new koaRouter({ prefix: '/moment' })
// 创建动态
router.post('/', verifyAuth, create)
// 获取动态列表
router.get('/', list)
// 获取动态详情
router.get('/:momentId', detail)
// patch方式一般用于修改内容
// 需要验证是否登录和是否具备管理员权限
router.patch('/:momentId', verifyAuth, verifyPermission, update)
// delete方式一般用于删除
// 需要验证是否登录和是否具备管理员权限
router.delete('/:momentId', verifyAuth, verifyPermission, remove)
// 给动态添加标签
router.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels)
// 动态配图服务
router.get('/images/:filename', fileInfo)
module.exports = router