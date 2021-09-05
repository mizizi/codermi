const connection = require('../app/database')
class UserServices {
    // 用户信息写入数据库
    async create(user) {
        const { username, password } = user
        console.log('将数据保存到数据库中', user);
        // 将user存储到数据库
        const statement = 'INSERT INTO user_ch (name,password) VALUES(?,?);'
        const result = await connection.execute(statement, [username, password])
        console.log(result);
        return result[0]
    }
    // 根据用户名获取用户信息
    async getUserByName(username) {
        try {
            const statement = 'select * from user_ch where name=?'
            const result = await connection.execute(statement, [username])
            return result[0]
        } catch (error) {
            console.log(error);
        }
    }
    // 修改密码
    async updateUserPassword(password, id) {
        try {
            const statement = `update user_ch set password=? where id=?`
            const result = await connection.execute(statement, [password, id])
            return result
        } catch (error) {
            console.log(error);
        }
    }
    // 存图片路径
    async updateAvatarUrlById(avatarURL, id) {
        const statement = `update user_ch set avatar_url=? where id=?`
        const result = await connection.execute(statement, [avatarURL, id])
        return result
    }
}
module.exports = new UserServices()