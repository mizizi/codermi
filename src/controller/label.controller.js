const LabelServices = require('../services/label.services')
const moment = require('moment')
class LabelController {
    async create(ctx, next) {
        const { name } = ctx.request.body
        const result = await LabelServices.create(name)
        ctx.body = {
            status: 200,
            msg: '获取标签数据成功',
            result
        }
    }
    async list(ctx, next) {
        const { limit, offset } = ctx.query
        const result = await LabelServices.getLabels(offset, limit)
        for (const timer of result) {
            timer.createAt = moment(timer.createAt).format('YYYY年MM月DD日 HH时mm分ss秒')
            timer.updateAt = moment(timer.updateAt).format('YYYY年MM月DD日 HH时mm分ss秒')
        }
        ctx.body = result
    }
}
module.exports = new LabelController()