const errorType = require('../constants/error-type')
const errorHeader = (error, ctx) => {
    let status, message
    console.log(error.message);
    switch (error.message) {
        case errorType.NAME_OR_PASSWORD_IS_REQUIRED:
            status = 400;//badRequest 参数问题
            message = '用户名和密码不能为空';
            break;
        case errorType.USER_ALREADY_EXISTS:
            status = 409;//conflict 参数冲突
            message = '用户名已存在';
            break;
        case errorType.USER_DOES_NOT_EXISTS:
            status = 400;//conflict 参数冲突
            message = '用户名不存在';
            break;
        case errorType.PASSWORD_IS_INCORRECT:
            status = 400;//conflict 参数冲突
            message = '密码错误';
            break
        case errorType.UNAUTHORIZATION:
            status = 401;//conflict 参数冲突
            message = '未授权,无效token';
            break
        case errorType.UNPERMISSION:
            status = 401;//conflict 参数冲突
            message = '你灭有权限wo';
            break
        case errorType.The_username_and_password_are_invalid:
            status = 401;//conflict 参数冲突
            message = '用户名和密码不符合规范';
            break
        case errorType.THE_SAME_TO_PASSWORD_WITH_NEWPASSWORD_AND_OLDPASSWORD:
            status = 401;//conflict 参数冲突
            message = '新旧密码一致';
            break
        case errorType.Imperfect_information:
            status = 401;//conflict 参数冲突
            message = '未知动态';
            break
        default:
            status = 404;
            message = 'Not Found'
            break;
    }
    ctx.body = {
        status,
        message
    }
}
module.exports = {
    errorHeader
}