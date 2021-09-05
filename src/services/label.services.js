const connection = require('../app/database')
class LabelServices {
    async create(name) {
        const statement = `insert into label (name) VALUES(?)`
        const [result] = await connection.execute(statement, [name])
        return result
    }
    async getLabelByName(name) {
        const statement = `select * from label where name=?`
        const [result] = await connection.execute(statement, [name])
        return result[0]
    }
    async getLabels(offset, limit) {
        const statement = `select * from label limit ?,?`
        const [result] = await connection.execute(statement, [offset, limit])
        return result
    }
}
module.exports = new LabelServices()