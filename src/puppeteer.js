const puppeteer = require('puppeteer');
module.exports = async (ctx) => {
  const query = ctx.query;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({
    width: 320,
    height: 7020
  });
  await page.goto(query.url);
  await page.waitFor(query.sleep || 1000)
  page.evaluate(() => {
    // document.write(666)
  })
  const buffer = await page.screenshot({
    path: ''
  });
  ctx.body = `<img src="data:image/png;base64,${buffer.toString('base64')}">`;
  await browser.close();
};
