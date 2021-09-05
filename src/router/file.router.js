const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/upload' })
const {
    verifyAuth
} = require('../middleware/authMiddleware')
const {
    avatarHandler,
    pictureHandler,
    pictureResize,
    checkUserInfo
} = require('../middleware/fileMiddleware')
const {
    saveAvatarInfo,
    savePictureInfo
} = require('../controller/file.controller')
router.post('/', verifyAuth, avatarHandler, saveAvatarInfo)
router.post('/pictures', verifyAuth, checkUserInfo, pictureHandler, pictureResize, savePictureInfo)
module.exports = router