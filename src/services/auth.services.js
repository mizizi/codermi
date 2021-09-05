const connection = require('../app/database')
// 用来处理所有权限相关问题
class AuthServices {
    async checkResource(tableName, id, userId) {
        try {
            const statement = `select * from ${tableName} where id=? and user_id=?`
            const [result] = await connection.execute(statement, [id, userId])
            return result.length === 0 ? false : true
        } catch (error) {
            console.log(error);
        }
    }
    async getUserMoment(id) {
        console.log(id);
        try {
            const statement = `select u.id,u.name,u.createAt,u.updateAt,u.avatar_url,
            JSON_ARRAYAGG(JSON_OBJECT('id',m.id,'content',m.content)) Moment
            FROM 
            user_ch u LEFT JOIN moment m ON u.id=m.user_id
            WHERE u.id=?
            group by u.id
            `
            const [result] = await connection.execute(statement, [id])
            return result[0]
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = new AuthServices()