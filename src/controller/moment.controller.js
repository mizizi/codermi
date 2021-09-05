const fileServices = require('../services/file.services')
const MomentServices = require('../services/moment.services')
const fs = require('fs')
const { PICTURE_PATH } = require('../constants/file-path')
class momentController {
    async create(ctx, next) {
        // 获取数据(user_id,content)
        const userId = ctx.user.id
        const { content, title } = ctx.request.body
        console.log(title);
        const result = await MomentServices.create(userId, content, title)
        ctx.body = {
            status: 200,
            msg: '添加动态成功',
            result
        }
    }
    async detail(ctx, next) {
        // 获取moment id
        const momentId = ctx.params.momentId
        // 根据id查询数据
        const result = await MomentServices.getMomentById(momentId)
        ctx.body = result[0]
    }
    async list(ctx, next) {
        // 获取数据(offset)
        const { offset, size } = ctx.query
        console.log(offset, size);
        // 查询列表
        let result = await MomentServices.getMomentList(offset, size)
        result = result[0]
        ctx.body = {
            status: 200,
            msg: '获取动态列表成功',
            result
        }
    }
    async update(ctx, next) {
        // 获取参数
        const { momentId } = ctx.params
        const { content } = ctx.request.body
        console.log(ctx.request.body);
        console.log(momentId, content);
        // 修改内容
        const result = await MomentServices.update(content, momentId)

        ctx.body = {
            status: 200,
            msg: '修改数据成功',
            result
        }
    }
    async remove(ctx, next) {
        // 获取momentId
        const { momentId } = ctx.params
        const result = await MomentServices.remove(momentId)
        ctx.body = {
            status: 200,
            msg: '删除动态成功',
            result
        }
    }
    async addLabels(ctx, next) {
        // 获取标签和动态id
        const { labels } = ctx
        const { momentId } = ctx.params
        // 添加所有标签
        for (const label of labels) {
            // 判断标签是否已经和动态有过关系了
            const isExists = await MomentServices.hasLabel(momentId, label.id)
            if (!isExists) {
                await MomentServices.addLabel(momentId, label.id)
            }
        }
        ctx.body = {
            message: '添加标签成功',
            status: 200
        }
    }
    async fileInfo(ctx, next) {
        let { filename } = ctx.params
        const { type } = ctx.query
        const types = ["large", "middle", "small"]
        if (types.some(item => item === type)) {
            filename = filename + '-' + type
        } else {
            filename = filename
        }
        const result = await fileServices.getFileByName(filename)
        ctx.response.set('content-type', result.mimetype)
        ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`)
    }
}
module.exports = new momentController()