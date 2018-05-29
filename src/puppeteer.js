const puppeteer = require('puppeteer');

module.exports = async (ctx) => {
  const query = ctx.query;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  if (query.platform !== 'pc') {
    const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 sina-screen-shot Mobile/13B143 Safari/601.1';
    await page.setUserAgent(userAgent);
  }
  let fullPage = false;
  if (!query.width || !query.height) {
    fullPage = true;
  }
  let options = {
    fullPage,
    type: query.type || 'png',
    path: '2.png',
    omitBackground: true
  };
  if (!fullPage) {
    await page.setViewport({
      width: +query.width,
      height: +query.height
    });
    Object.assign(options, {
      clip: {
        x: +query.left || 0,
        y: +query.top || 0,
        width: +query.width,
        height: +query.height
      }
    })
  }
  await page.goto(query.url);
  await page.waitFor(+query.sleep || 1000);

  const buffer = await page.screenshot(options);
  ctx.type = 'image/png';
  ctx.body = buffer;
  await browser.close();
};
