const Koa = require('koa');
const Router = require('koa-router');
const static = require('./routers/static');
const body = require('koa-better-body');
const path = require('path');
const session = require('koa-session');
const fs = require('fs');

let server = new Koa();
server.listen(8080);

//中间件
server.use(body({
    uploadDir: path.resolve(__dirname, './static/upload')
}));

server.keys = fs.readFileSync('.keys').toString().split('\n');
server.use(session({
    maxAge: 20 * 60 * 1000,
    renew: true
}, server));

//数据库
server.context.db = require('./libs/database');


//路由和static
let router = new Router();

//统一处理
router.use(async (ctx, next) => {
    try {
        await next();

        //可以在这里对所有对接口输出进行统一处理
        // ctx.body......
    } catch (e) {
        ctx.throw(500,'Internal Server Error');
    }
});

router.use('/admin', require('./routers/admin'));
router.use('/api', require('./routers/api'));
router.use('', require('./routers/www'));

//传参数的情况
// static(router,{
//     html:10
// });

//不传参数的情况
static(router);

server.use(router.routes());
