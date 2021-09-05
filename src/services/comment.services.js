const connection = require('../app/database')
class CommentServices {
    async create(content, momentId, userId) {
        const statement = `insert into comment (content,moment_id,user_id) values(?,?,?)`
        const result = await connection.execute(statement, [content, momentId, userId])
        return result
    }
    async reply(content, momentId, userId, commentId) {
        const statement = `insert into comment (content,moment_id,user_id,comment_id) values(?,?,?,?)`
        const result = await connection.execute(statement, [content, momentId, userId, commentId])
        return result
    }
    async update(content, commentId) {
        const statement = `update comment set content=? where id=?`
        const [result] = await connection.execute(statement, [content, commentId])
        return result
    }
    async remove(commentId) {
        const statement = `delete from comment where id=?`
        const result = await connection.execute(statement, [commentId])
        return result
    }
    async getCommentsByMomentId(momentId) {
        const statement = `select * from comment where moment_id=?`
        const [result] = await connection.execute(statement, [momentId])
        return result
    }
}
module.exports = new CommentServices()