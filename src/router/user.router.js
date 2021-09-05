const Router = require('koa-router')

const {
    create,
    avatarInfo,
    changePsd
} = require('../controller/user.controller.js')

const {
    verifyUser,
    handlePassword,
    verifyNewPsd
} = require('../middleware/userMiddleware')
const {
    verifyAuth
} = require('../middleware/authMiddleware')
const userRouter = new Router({ prefix: '/users' })

userRouter.post('/', verifyUser, handlePassword, create)
userRouter.get('/:userId/avatar', avatarInfo)
userRouter.post('/changePsd', verifyAuth, verifyNewPsd, handlePassword, changePsd)
module.exports = userRouter