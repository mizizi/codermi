const connection = require('../app/database')
// const sqlFragment = `
// SELECT
//     m.id id,m.content content,m.createAt creteTime,m.updateAt updateTime,
//     JSON_OBJECT('id',u.id,'name',u.name) author
// FROM
//     moment m LEFT JOIN user_ch u ON m.user_id=u.id`
class MomentServices {
    async create(userId, content, title) {
        const statement = `insert into moment (user_id,content,title) values(?,?,?)`
        const result = await connection.execute(statement, [userId, content, title])
        return result
    }
    async getMomentById(momentId) {
        const statement =
            `SELECT 
            m.id id, m.content '动态',m.title title,m.createAt createAt,m.updateAt updateAt,
            JSON_OBJECT('id',u.id,'name',u.name,'avatar',u.avatar_url) author,
            (COUNT(l.id)) labelCount,
            IF(COUNT(l.id),JSON_ARRAYAGG(JSON_OBJECT('id',l.id,'name',l.name)),NULL) labels,
            (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount,
            (SELECT IF(COUNT(c.id),JSON_ARRAYAGG(
                JSON_OBJECT('id',c.id,'评论内容',c.content,'commentId',c.comment_id,'createTIME',c.createAt,
                '评论人',JSON_OBJECT('id',cu.id,'name',cu.name,'avatar',cu.avatar_url))
            ) ,NULL) FROM comment c LEFT JOIN user_ch cu ON c.user_id=cu.id WHERE m.id=c.moment_id) Comments,
            (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:', '8000/moment/images/', filename)) FROM file WHERE m.id=file.moment_id ) images
        FROM moment m
        LEFT JOIN user_ch u ON m.user_id=u.id
        
        LEFT JOIN moment_label ml ON m.id=ml.moment_id
        LEFT JOIN label l ON ml.label_id=l.id
        WHERE m.id=?
        GROUP BY m.id`
        const result = await connection.execute(statement, [momentId])
        return result[0]
    }
    async getMomentList(offset, size) {
        const statement =
            `SELECT
            (SELECT COUNT(*) FROM moment) MomentCount,
            m.id id,m.content content,m.title title,m.createAt creteTime,m.updateAt updateTime,
            JSON_OBJECT('id',u.id,'name',u.name) author,
            (SELECT COUNT(*) FROM comment c WHERE c.moment_id=m.id) CommentCount,
            (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id=m.id) LabelCount,
            (SELECT JSON_ARRAYAGG(CONCAT('http://localhost:', '8000/moment/images/', filename)) FROM file WHERE m.id=file.moment_id ) images
        FROM
            moment m LEFT JOIN user_ch u ON m.user_id=u.id
        limit ?,? `
        offset = (offset - 1) * size
        offset = offset.toString()
        // offset,初始值必须大于等于1
        const result = await connection.execute(statement, [offset, size])
        return result
    }
    async update(content, id) {
        const statement = `update moment set content =? where id =? `
        const [result] = await connection.execute(statement, [content, id])
        return result
    }
    async remove(momentId) {
        const statement = `delete from moment where id =? `
        const result = await connection.execute(statement, [momentId])
        return result
    }
    async hasLabel(momentId, labelId) {
        const statement = `select * from moment_label where moment_id=? and label_id=?`
        const [result] = await connection.execute(statement, [momentId, labelId])
        return result[0] ? true : false
    }
    async addLabel(momentId, labelId) {
        const statement = `insert into moment_label (moment_id,label_id) values(?,?)`
        const result = await connection.execute(statement, [momentId, labelId])
        return result
    }
}
module.exports = new MomentServices()