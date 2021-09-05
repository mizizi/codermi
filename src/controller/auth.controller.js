const jwt = require('jsonwebtoken')
const AuthServices = require('../services/auth.services')
const { PRIVATE_KEY } = require('../app/config')
class AuthController {
    async login(ctx, next) {
        const { id, name } = ctx.user
        const token = jwt.sign({ id, name }, PRIVATE_KEY, {
            expiresIn: 60 * 60 * 24 * 3,
            algorithm: 'RS256'
        })
        ctx.body = {
            status: 200,
            msg: '登录成功',
            token
        }
    }
    async list(ctx, next) {
        const { id } = ctx.user
        const result = await AuthServices.getUserMoment(id)
        ctx.body = {
            status: 200,
            msg: "获取数据成功",
            result
        }
    }
}
module.exports = new AuthController()