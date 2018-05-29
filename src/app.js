const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
const router = new Router();

const sleep = require('sleep');
const phantom = require('phantom');
const puppeteer = require('./puppeteer');

router.get('/screenshot', (ctx, next) => {
  const query = ctx.query;
  // return puppeteer(ctx)
  return (async function () {
    // const instance = await phantom.create([], {
    //   logger: {warn: console.warn, debug: console.log, error: console.error},
    //   logLevel: 'error'
    // });
    const instance = await phantom.create();
    const page = await instance.createPage();
    const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 sina-screen-shot Mobile/13B143 Safari/601.1';
    await page.setting('userAgent', userAgent);
    await page.setting('resourceTimeout', query.timeout || 10000);
    await page.property('viewportSize', {width: query.width, height: query.height});
    await page.property('clipRect', {width: query.width, height: query.height});

    await page.on("onResourceRequested", function (requestData) {
      console.info('Requesting', requestData.url);
    });

    // await page.on('onInitialized', async function () {
      // await page.includeJs('https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js');
      // await page.evaluate(function () {
      //   const script = document.createElement('script');
      //   script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js');
      //   script.src = 'https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js';
      //   document.head.insertBefore(script, document.head.firstChild);
      // })
    // });

    // await page.includeJs('https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js').then(data => {
    //   console.log(data)
    //   page.evaluate(function () {
    //     document.title = window.ES6Promise;
    //   })
    // });

    // await page.includeJs('https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js');

    const status = await page.open(query.url);
    console.log(status);
    // page.includeJs('https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js').then(data => {
    //   console.log(data)
    //   page.evaluate(function () {
    //     document.write(678)
    //   })
    // });
    // await sleep.msleep(query.sleep || 5000);
    // await page.evaluate(function () {
      // const style = document.createElement('style');
      // const text  = document.createTextNode('body { background: #fff }');
      // style.setAttribute('type', 'text/css');
      // style.appendChild(text);
      // document.head.insertBefore(style, document.head.firstChild);

      // const script = document.createElement('script');
      // script.setAttribute('src', 'https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js');
      // script.src = 'https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js';
      // document.head.insertBefore(script, document.head.firstChild);
      // document.body.innerHTML = window.ES6Promise;
      // sleep.msleep(1000);
      // document.write(window.ES6Promise + '----' + window.Promise);
    // });

    // await sleep.msleep(query.sleep || 15000);
    // const content = await page.property('content');
    const png1 = await page.render('0.png');
    await sleep.msleep(15000);
    const png2 = await page.render('1.png');
    const pngBase64 = await page.renderBase64();
    ctx.body = `<img src="data:image/png;base64,${pngBase64}">`

    // console.log(content);
    // ctx.response.body = content
    await instance.exit();
  }());
});

app.use(router.routes())
app.use((ctx, next) => {
  // ctx.body = 'Hello Koa'
  next()
})

app.listen(3000)
