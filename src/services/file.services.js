const connection = require('../app/database')
const { PICTURE_PATH } = require('../constants/file-path')
const fs = require('fs')
class FileServices {
    async createAvatar(filename, mimetype, size, user_id) {
        try {
            const statement = `insert into avatar (filename,mimetype,size,user_id) values(?,?,?,?)`
            const result = await connection.execute(statement, [filename, mimetype, size, user_id])
            return result
        } catch (error) {
            console.log(error);
        }
    }
    async getAvatarByUserId(userId) {
        const statement = `select * from avatar where user_id=?`
        const result = await connection.execute(statement, [userId])
        return result[0]
    }
    async createFile(filename, mimetype, size, userId, momentId) {
        
        try {
            const statement = `insert into file (filename,mimetype,size,user_id,moment_id) values(?,?,?,?,?)`
            const result = await connection.execute(statement, [filename, mimetype, size, userId, momentId])
            return result
        } catch (err) {
            console.log('出现了错误');

        }
    }
    async getFileByName(filename) {
        const statement = `select * from file where filename=?`
        const result = await connection.execute(statement, [filename])
        return result[0]
    }
}
module.exports = new FileServices()