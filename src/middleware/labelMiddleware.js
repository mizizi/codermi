const labelServices = require("../services/label.services")
const verifyLabelExists = async (ctx, next) => {
    // 取出要添加的所有标签
    const { labels } = ctx.request.body
    // 判断标签是否在数据库中
    const newLabels = []
    for (const name of labels) {
        const labelResult = await labelServices.getLabelByName(name)
        // 语法糖 
        console.log({ name });
        const label = { name }
        if (!labelResult) {
            const result = await labelServices.create(name)
            label.id = result.insertId
        } else {
            label.id = labelResult.id
        }
        newLabels.push(label)
    }
    ctx.labels = newLabels
    await next()
}
module.exports = {
    verifyLabelExists
}