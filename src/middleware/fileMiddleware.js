const path = require('path')
const koaMulter = require('koa-multer')
const Jimp = require('jimp')
const { PICTURE_PATH, AVATAR_PATH } = require('../constants/file-path')
const avatarUpload = koaMulter({
    dest: AVATAR_PATH
})
const errorTypes = require('../constants/error-type')
const avatarHandler = avatarUpload.single('avatar')
const pictureUpload = koaMulter({
    dest: PICTURE_PATH
})
const pictureHandler = pictureUpload.array('picture', 9)
// 图像处理中间件
const pictureResize = async (ctx, next) => {
    try {
        // 1.获取所有的信息
        const files = ctx.req.files
        // 2.对图像进行处理(第三方库sharp(图片路径).resize,jimp库)
        for (const file of files) {
            const destPath = path.join(file.destination, file.filename)
            Jimp.read(file.path).then(image => {
                image.resize(1280, Jimp.AUTO).write(`${destPath}-large`)
                image.resize(640, Jimp.AUTO).write(`${destPath}-middle`)
                image.resize(320, Jimp.AUTO).write(`${destPath}-small`)
            })
        }
        await next()
    } catch (error) {
        console.log(error);
    }

}
// 验证信息完整性,如果信息不完整,不写入图片到文件夹
const checkUserInfo = async (ctx, next) => {
    const { momentId } = ctx.query
    if (!momentId) {
        const error = new Error(errorTypes.Imperfect_information)
        return ctx.app.emit('error', error, ctx)
    } else {
        await next()
    }
}
module.exports = {
    avatarHandler,
    pictureHandler,
    pictureResize,
    checkUserInfo
}