const jwt = require('jsonwebtoken')
const errorType = require('../constants/error-type')
const UserService = require('../services/user.services')
const AuthServices = require('../services/auth.services')
const md5password = require('../utils/password-handle')
const { PUBLISH_KEY } = require('../app/config')
const verifyLogin = async (ctx, next) => {
    console.log('登录验证中间件');
    const { name, password } = ctx.request.body
    // 判断用户名密码是否为空
    if (!name || !password) {
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', error, ctx)
    }
    // 判断用户是否存在
    const result = await UserService.getUserByName(name)
    if (!result[0]) {
        const error = new Error(errorType.USER_DOES_NOT_EXISTS)
        return ctx.app.emit('error', error, ctx)
    }
    // 判断密码是否一致(加密比对)
    if (md5password(password) != result[0].password) {
        const error = new Error(errorType.PASSWORD_IS_INCORRECT)
        return ctx.app.emit('error', error, ctx)
    }
    ctx.user = result[0]
    await next()
}
const verifyAuth = async (ctx, next) => {
    console.log("登录验证中间件---verifyAuth");
    // 获取token
    const authorization = ctx.headers.authorization
    if (!authorization) {
        const error = new Error(errorType.UNAUTHORIZATION)
        return ctx.app.emit('error', error, ctx)
    }
    const token = authorization.replace('Bearer ', '')
    // 验证token
    try {
        const result = jwt.verify(token, PUBLISH_KEY, {
            algorithms: ["RS256"]
        })
        ctx.user = result
        await next()
    } catch (err) {
        const error = new Error(errorType.UNAUTHORIZATION)
        ctx.app.emit('error', error, ctx)
    }
}
const verifyPermission = async (ctx, next) => {
    console.log('权限验证中间件');
    const { id } = ctx.user
    const [resourceKey] = Object.keys(ctx.params)
    const tableName = resourceKey.replace('Id', '')
    const momentId = ctx.params[resourceKey]
    try {
        const isPermission = await AuthServices.checkResource(tableName, momentId, id)
        if (!isPermission) throw new Error()
        await next()
    } catch (err) {
        const error = new Error(errorType.UNPERMISSION)
        return ctx.app.emit('error', error, ctx)
    }
}
module.exports = { verifyLogin, verifyAuth, verifyPermission }