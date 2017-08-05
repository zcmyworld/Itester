let Koa = require('koa');
let app = new Koa();
let bodyParser = require('koa-bodyparser');
let router = require('koa-router')({});
let path = require('path');
let routerHandler = require('./app/Routes/web');
let config = require('./app/Configs/')
let send = require('koa-send');
let cors = require('koa-cors');

app.use(cors());


//POST请求解析body
app.use(bodyParser());

//路由处
routerHandler(router);

app
  .use(router.routes())
  .use(router.allowedMethods());

//加载静态文件
app.use(async (ctx) => {
  await send(ctx, ctx.path, { root: path.join(__dirname, '/statics') });
})

if (module.parent) {
  module.exports = app;
} else {
  app.listen(3002);
}