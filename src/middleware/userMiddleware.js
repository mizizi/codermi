const errorType = require('../constants/error-type')
const service = require('../services/user.services')
const md5password = require('../utils/password-handle')

// 验证
const verifyUser = async (ctx, next) => {
    // 获取用户名密码
    const { username, password } = ctx.request.body
    console.log(username, password);
    // 判断用户名是否为空
    if (!username || !password) {
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', error, ctx)
    }
    // 判断用户名和密码是否符合规则
    const nameReg = /^([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9])*$/;
    const passwordReg = /^[A-z]\w{5,11}$/
    if (!nameReg.test(username) || !passwordReg.test(password)) {
        const error = new Error(errorType.The_username_and_password_are_invalid)
        return ctx.app.emit('error', error, ctx)
    }
    // 判断用户名知否注册过
    const result = await service.getUserByName(username)
    if (result.length) {
        const error = new Error(errorType.USER_ALREADY_EXISTS)
        return ctx.app.emit('error', error, ctx)
    }
    await next()
}
// 密码加密
const handlePassword = async (ctx, next) => {
    let { password } = ctx.request.body
    ctx.request.body.password = md5password(password)
    console.log(ctx.request.body.password);
    await next()
}
// 修改密码验证
const verifyNewPsd = async (ctx, next) => {
    const { oldPassword, newPassword } = ctx.request.body
    const { name } = ctx.user
    // 判断密码是否为空
    if (!oldPassword || !newPassword) {
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRED)
        return ctx.app.emit('error', error, ctx)
    }
    // 判断原密码是否一致(加密比对)
    const result = await service.getUserByName(name)
    if (md5password(oldPassword) !== result[0].password) {
        const error = new Error(errorType.PASSWORD_IS_INCORRECT)
        return ctx.app.emit('error', error, ctx)
    }
    // 判断新密码是否符合规则
    const passwordReg = /^[A-z]\w{5,11}$/
    if (!passwordReg.test(newPassword)) {
        const error = new Error(errorType.The_username_and_password_are_invalid)
        return ctx.app.emit('error', error, ctx)
    }
    // 判断新旧密码是否相等
    if (newPassword === oldPassword) {
        const error = new Error(errorType.THE_SAME_TO_PASSWORD_WITH_NEWPASSWORD_AND_OLDPASSWORD)
        return ctx.app.emit('error', error, ctx)
    }
    ctx.request.body.password = ctx.request.body.newPassword
    await next()
}
module.exports = {
    verifyUser,
    handlePassword,
    verifyNewPsd
}