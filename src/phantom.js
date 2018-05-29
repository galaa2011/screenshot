const sleep = require('sleep');
const phantom = require('phantom');

module.exports = async function (ctx) {
  const query = ctx.query;
  // const instance = await phantom.create([], {
  //   logger: {
  //     warn: console.warn,
  //     debug: console.log,
  //     error: console.error
  //   },
  //   logLevel: 'error'
  // });
  const instance = await phantom.create();
  const page = await instance.createPage();
  if (query.platform !== 'pc') {
    const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 sina-screen-shot Mobile/13B143 Safari/601.1';
    await page.setting('userAgent', userAgent);
  }
  // await page.setting('resourceTimeout', 10000);
  await page.property('viewportSize', {
    width: +query.width,
    height: +query.height
  });
  await page.property('clipRect', {
    top: +query.top || 0,
    left: +query.left || 0,
    width: +query.width,
    height: +query.height
  });

  await page.on("onResourceRequested", function (requestData) {
    // console.info('Requesting', requestData.url);
  });
  await page.on("onResourceReceived", function (requestData) {
    // console.info('Received', requestData.url);
  });

  // await page.includeJs('https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js');

  const status = await page.open(query.url);
  console.log(status);
  // await sleep.msleep(query.sleep || 5000);
  // await page.evaluate(function () {
  //   document.write(window.ES6Promise + '----' + window.Promise);
  // });

  await sleep.msleep(+query.sleep || 1000);
  const png = await page.render('1.png', {
    format: query.type || 'png'
  });
  const base64 = await page.renderBase64(query.type || 'png');
  const buffer = new Buffer(base64, 'base64')
  ctx.type = 'image/png';
  ctx.body = buffer;
  await instance.exit();
};
