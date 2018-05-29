const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();

const phantom = require('./phantom');
const puppeteer = require('./puppeteer');

router.get('/screenshot', (ctx, next) => {
  // return phantom(ctx);
  if (ctx.query.lib === 'phantom') {
    return phantom(ctx);
  }
  return puppeteer(ctx);
});

app.use(router.routes());
// app.use((ctx, next) => {
//   next();
// })

app.listen(3000);
