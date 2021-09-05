const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')
dotenv.config()
// const {APP_PORT}=process.env

const PRIVATE = fs.readFileSync(path.resolve(__dirname, './keys/private.key'))
const PUBLISH = fs.readFileSync(path.resolve(__dirname, './keys/public.key'))

module.exports = {
    APP_HOST,
    APP_PORT,
    MYSQL_HOST,
    MYSQL_PORT,
    MYSQL_DATABASE,
    MYSQL_ROOT,
    MYSQL_PASSWORD

} = process.env
// 必须写在后面
module.exports.PRIVATE_KEY = PRIVATE
module.exports.PUBLISH_KEY = PUBLISH