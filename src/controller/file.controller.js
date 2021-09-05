const FileServices = require('../services/file.services')
const { AVATAR_PATH } = require('../constants/file-path')
const UserServices = require('../services/user.services')
const { APP_PORT, APP_HOST } = require('../app/config')
class FileController {
    async saveAvatarInfo(ctx, next) {
        // 获取数据
        const { filename, mimetype, size } = ctx.req.file
        const { id, name } = ctx.user
        // 将数据存到数据库
        const result = await FileServices.createAvatar(filename, mimetype, size, id)
        // 将图片地址保存到user表中
        const avatarURL = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
        await UserServices.updateAvatarUrlById(avatarURL, id)
        ctx.body = {
            status: 200,
            msg: '上传头像成功',
            id,
            name,
            avatarURL
        }
    }
    async savePictureInfo(ctx, next) {
        // 获取图像信息
        const files = ctx.req.files
        const { id } = ctx.user
        const { momentId } = ctx.query
        // 将数据存到数据库
        for (const file of files) {
            const { filename, mimetype, size } = file
            await FileServices.createFile(filename, mimetype, size, id, momentId)
        }
        ctx.body = {
            status: 200,
            msg: '动态配图上传成功'
        }
    }
}
module.exports = new FileController()