let Koa = require('koa');
// let app = new Koa();
let websockify = require('koa-websocket');
const app = websockify(new Koa());
let bodyParser = require('koa-bodyparser');
let router = require('koa-router')({});
let path = require('path');
let routerHandler = require('./app/Routes/web');
let config = require('./app/Configs/')
let send = require('koa-send');
let cors = require('koa-cors');
let http = require('http');

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




let SystemService = require('./app/Services/System');

let WsController = require('./app/Controllers/WsController');


app.ws.use(async function (ctx, next) {
  ctx.websocket.on('message', async function (message) {
    try {
      message = JSON.parse(message);
      WsController.cpu_temp(ctx);
      WsController.cpu_utilization(ctx);
      WsController.load_avg(ctx);
      WsController.current_ram(ctx);
    } catch (e) {
      console.log(e)
      ctx.websocket.send(JSON.stringify({
        code: -1,
        message: 'ws参数异常'
      }));
    }
  });


  return next(ctx);
});


if (module.parent) {
  module.exports = app;
} else {
  app.listen(3002);
}
