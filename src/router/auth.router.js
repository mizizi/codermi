const router = require('koa-router')
const {
    login,
    list
} = require('../controller/auth.controller.js')
const {
    verifyLogin,
    verifyAuth
} = require('../middleware/authMiddleware')
const authRouter = new router({ prefix: '/login' })
authRouter.post('/', verifyLogin, login)
authRouter.get('/moment',verifyAuth,list)
module.exports = authRouter