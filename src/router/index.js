const fs = require('fs')
// 遍历文件,根据router文件绑定中间件
const useRoutes = (app) => {
    fs.readdirSync(__dirname).forEach(file => {
        if (file == "index.js") {
            return
        }
        const router = require(`./${file}`)
        app.use(router.routes())
        app.use(router.allowedMethods())
    })
}
module.exports=useRoutes