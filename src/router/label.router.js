const koaRouter = require('koa-router')
const { verifyAuth } = require('../middleware/authMiddleware')
const { create, list } = require('../controller/label.controller')
const router = new koaRouter({ prefix: '/label' })
router.post('/', verifyAuth, create)
router.get('/', list)
module.exports = router