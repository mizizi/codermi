const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const { errorHeader } = require('./error-handle')
const userRoutes = require('../router/index')
const { CORS } = require('./CORS')
// 跨域中间件
app.use(CORS)  
// 引入bodyparser 解析json字符串
app.use(bodyParser())
userRoutes(app)
// 错误处理
app.on('error', errorHeader)


module.exports = app
