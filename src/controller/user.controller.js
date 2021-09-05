const userServices = require('../services/user.services')
const fileServices = require('../services/file.services')
const { AVATAR_PATH } = require('../constants/file-path')
const fs = require('fs')
class UserController {
    async create(ctx, next) {
        // 获取用户请求的参数
        const user = await ctx.request.body
        // 查询数据库 
        const result = await userServices.create(user)
        // 返回数据
        ctx.body = {
            status: 200,
            msg: '注册用户成功',
            result
        }
    }
    async avatarInfo(ctx, next) {
        const { userId } = ctx.params
        const result = await fileServices.getAvatarByUserId(userId)
        // 设置响应类型,直接展示文件,不设置的话就是下载文件
        ctx.response.set("content-type", result[result.length - 1].mimetype)
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${result[result.length - 1].filename}`)
    }
    async changePsd(ctx, next) {
        const { password } = ctx.request.body
        const { id } = ctx.user
        console.log(password);
        const result = await userServices.updateUserPassword(password, id)
        ctx.body = {
            status: 200,
            msg: '修改密码成功',
            result
        }
    }
}
module.exports = new UserController()